import { User, Chat } from "../models/index.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthenticated } from "../errors/index.js";
import { cookieResponse, generateToken } from "../utils/index.js";

const registerUser = async (req, res) => {
  // We use req.body to access the data sent by the client in the request body
  // IMPORTANT NOTE: req.body is used to access the data sent by the client in the request body, which is essential for operations like user registration.
  const { name, username, email, password, bio } = req.body;
  // console.log(req.body);

  const avatar = {
    public_id: "sdfs",
    url: "asd",
  };

  const user = await User.create({
    name,
    username,
    email,
    bio,
    password,
    avatar,
  });

  // Extract necessary user data to be included in the JWT token payload
  const tokenUser = generateToken(user);
  // Generate a JWT token for the user and set it in an HTTP-only, secure cookie in the response
  cookieResponse({ res, user: tokenUser });
  // res.status(StatusCodes.CREATED).json({ message: "successfully registered" });
};

const loginUser = async (req, res) => {
  const { email, username, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: email }, { username: username }],
  }).select("+password");

  if (!user) {
    throw new Unauthenticated(`Not foun a user with that ${email}`);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Unauthenticated("Invalid Password, Please try again");
  }

  const tokenUser = generateToken(user);
  cookieResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).send({ user: tokenUser });
};
const logoutUser = async (req, res) => {
  return res
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    })
    .json({
      message: "You have been logged out",
      sucess: true,
    });
};

const getUserProfile = async (req, res) => {
  const getUser = await User.findById(req.user);

  res.status(StatusCodes.OK).json({
    sucess: true,
    getUser,
  });
};

const searchUser = async (req, res) => {
  const { name } = req.query;

  const allChats = await Chat.find({});

  if (!allChats || allChats.length === 0) {
    throw new BadRequest("No chats found");
  }

  const allChatMembers = allChats.flatMap((chat) => chat.members);

  if (!allChatMembers || allChatMembers.length === 0) {
    throw new BadRequest("No Members found in chats");
  }

  // Clarifies that this operation ensures only users who are not already members of any chat the current user is in are retrieved.
  const findAllUsersExceptMeAndMyFriends = await User.find({
    // Query to find all users who are not already members of any chat the current user is also not part
    _id: {
      $nin: allChatMembers, //ensuring the search results are only new potential contacts or users the current user is not already connected with.
      // name: { $regex: name, $options: "i" },
    },
  });

  if (findAllUsersExceptMeAndMyFriends.length === 0) {
    throw new BadRequest("No Members found in chats");
  }

  const findUsersAvatar = findAllUsersExceptMeAndMyFriends.map(
    ({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar?.url || "No Avatar URL Found",
    })
  );

  if (!findUsersAvatar) {
    throw new BadRequest("No Avatar found in chats, please try again");
  }

  return res.status(StatusCodes.OK).json({
    sucess: true,
    findUsersAvatar,
  });
};
export { loginUser, registerUser, logoutUser, getUserProfile, searchUser };
