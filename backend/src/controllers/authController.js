import { User, Chat, Request } from "../models/index.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequest,
  CloudinaryFileUploadError,
  NotFound,
  Unauthenticated,
} from "../errors/index.js";
import {
  cookieResponse,
  generateToken,
  emitEvent,
  uploadFilesToCloudinary,
} from "../utils/index.js";
import { NEW_REQUEST } from "../constants/events.js";
import { getOtherMembers } from "../lib/helper.js";

const registerUser = async (req, res) => {
  // console.log("User Register Successfully", req?.body);
  const { name, username, email, password, bio } = req.body;

  // Validate Email
  if (!email.includes("@")) {
    throw new BadRequest("Invalid Email address..");
  }

  // Validate the avatar file
  const file = req.file;
  // console.log(file);

  if (!file) {
    throw new BadRequest("Avatar file is required");
  }

  const resultFromCloudinary = await uploadFilesToCloudinary([file]);
  if (!resultFromCloudinary || !resultFromCloudinary.length) {
    throw new CloudinaryFileUploadError("Cloudinary file upload failed");
  }

  const avatar = {
    public_id: resultFromCloudinary[0].public_id,
    url: resultFromCloudinary[0].url,
  };
  // console.log("Base64 formatted file:", avatar);

  // Check if email or username already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === email && existingUser.username === username) {
      throw new BadRequest("Email and username already exists");
    } else if (existingUser.email === email) {
      throw new BadRequest("Email already exists");
    } else if (existingUser.username === username) {
      throw new BadRequest("Username already exists");
    }
  }

  let user;
  try {
    user = await User.create({
      name,
      username,
      email,
      bio,
      password,
      avatar,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("An error occurred while registering the user");
  }

  if (!user) {
    return;
  }

  // Extract necessary user data to be included in the JWT token payload
  const tokenUser = generateToken(user);
  cookieResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({
    user,
    avatar: avatar,
    success: true,
    message: "User Registered Successfully!",
  });
};

const loginUser = async (req, res) => {
  // console.log("Login request received:", req.body);

  const { usernameOrEmail, password } = req.body;
  // Validate inputs
  if (!usernameOrEmail || !password) {
    return next(new BadRequest("Username or email and password are required."));
  }

  const userFilter = {
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
  };

  const user = await User.findOne(userFilter).select("+password");

  // console.log("User found:", user);

  if (!user) {
    throw new Unauthenticated("Invalid username and password");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  // console.log("Password match:", isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new Unauthenticated("Invalid Password, Please try again");
  }

  const tokenUser = generateToken(user);
  // console.log("Token user:", tokenUser);
  cookieResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({
    success: true,
    user,
    message: "User Login Successfully",
  });
};

const logoutUser = async (req, res) => {
  // console.log("Logout request received:", req.body);

  cookieResponse({ res, expireToken: true });

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Logout Successfully",
  });
};

const getUserProfile = async (req, res) => {
  // console.log("Get user profile request received:", req.user);
  const { userId } = req.user;

  // console.log("Querying user with ID:", userId);

  const getUser = await User.findById(userId);
  if (!getUser) {
    throw new NotFound("User not found");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    user: getUser,
    message: "User Profile",
  });
};

const searchUser = async (req, res) => {
  const { name = "" } = req.query;

  const chats = await Chat.find({ groupChat: false, members: req.user.userId });
  let chatMemberIds = chats.flatMap((chat) => chat.members);

  // Query to find all users who are not already members of any chat the current user is also not part
  const potentialFriends = await User.find({
    _id: {
      //ensuring the search results are only new potential contacts or users the current user is not already connected with.
      $nin: chatMemberIds,
    },
    name: { $regex: name, $options: "i" },
  });

  if (potentialFriends.length === 0) {
    throw new BadRequest("No users found matching your search criteria.");
  }

  const findUsersAvatar = potentialFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar?.url || "Avatar not available",
  }));

  // console.log(findUsersAvatar);

  if (!findUsersAvatar) {
    throw new BadRequest("No users with avatars found. Please try again.");
  }

  return res.status(StatusCodes.OK).json({
    sucess: true,
    findUsersAvatar,
  });
};

const sendFriendRequest = async (req, res) => {
  // console.log("Send friend request:", req.body);
  const { userId } = req.body;

  const alreadySendRequest = await Request.findOne({
    $or: [
      { sender: req.user.userId, receiver: userId },
      { sender: userId, receiver: req.user.userId },
    ],
  });
  if (alreadySendRequest) {
    throw new BadRequest("You have already sent a friend request to this user");
  }

  const newRequest = await Request.create({
    sender: req.user.userId,
    receiver: userId,
  });

  // console.log("New Request received", newRequest);

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(StatusCodes.OK).json({
    sucess: true,
    request: newRequest,
    message: "Friend request sent successfully",
  });
};

const acceptFriendRequest = async (req, res) => {
  // console.log("AcceptFriendRequest", req.body);
  const { requestId, accept } = req.body;

  // Find the friend request by ID and populate sender and receiver details
  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  // console.log("Request Object:", request);

  if (!request) {
    throw new NotFound("Request not found");
  }

  // Check if the request is sent by the authenticated user (by userId)
  if (request.receiver._id.toString() !== req.user.userId.toString()) {
    throw new Unauthenticated("You are not authorized to accept this request");
  }

  // request.status = "accepted";

  // If the accept flag is false, delete the friend request
  if (!accept) {
    await request.deleteOne();
    return res.status(StatusCodes.OK).json({
      sucess: true,
      message: "Friend request declined successfully",
    });
  }

  // If the accept flag is true, create an array of members for the new chat means for both sender and receiver
  const members = [request.sender._id, request.receiver._id];
  console.log("create members", members);

  // 1. Create a new chat with the sender and receiver as membersP
  // 2. Delete the friend request
  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Friend request accepted. You're now friends!",
  });
};

const getAllNotifications = async (req, res) => {
  // Find all requests where the receiver is the authenticated user (by userId)
  // console.log("Getting all notifications", req.user);

  const { userId } = req.user;
  // console.log("Fetching notifications for userId:", userId);
  const requests = await Request.find({ receiver: userId }).populate(
    "sender",
    "name avatar"
  );

  // console.log("Found all requests", requests);

  if (!requests || requests.length === 0) {
    // Use 404 for "not found" scenarios
    throw new NotFound("No notifications found for this user");
  }

  const allRequests = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar?.url || "No Avatar URL Available",
    },
  }));

  // console.log("All requests", allRequests);

  if (!allRequests || allRequests.length === 0) {
    throw new NotFound(
      "Notifications found, but no valid sender data available."
    );
  }

  return res.status(StatusCodes.OK).json({
    sucess: true,
    allRequests,
  });
};

// TODO: We face some issues in this function, later we should correct them!
const getMyAllFriends = async (req, res) => {
  const chatId = req.query.chatId;

  // Fetch all direct (one-on-one) chats involving the current user
  const chats = await Chat.find({
    members: req.user.userId,
    groupChat: false,
  }).populate("members", "name avatar");

  if (!chats || chats.length === 0) {
    throw new NotFound("No chats found");
  }

  // The map function iterates over each chat (chats) and extracts the other member (friend) of each chat, excluding the current user.
  const friends = chats.map(({ members }) => {
    const otherUsers = getOtherMembers(members, req.user.userId);

    // Create a friend object with necessary details
    return {
      _id: otherUsers._id,
      name: otherUsers.name,
      avatar: otherUsers.avatar?.url || "No Avatar URL Found",
    };
  });

  if (friends.length === 0) {
    throw new NotFound("No friends found");
  }

  // If chatId is provided, filter out friends who are already members of the specified chat
  if (chatId) {
    const chat = await Chat.findById(chatId);

    // include those friends who are not members of the specified chat
    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend?._id)
    );
    return res.status(StatusCodes.OK).json({
      sucess: true,
      friends: availableFriends,
    });
  } else {
    return res.status(StatusCodes.OK).json({
      sucess: true,
      friends,
    });
  }
};

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getAllNotifications,
  getMyAllFriends,
};
