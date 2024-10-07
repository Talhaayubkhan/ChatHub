import crypto from "crypto";
import { Chat, Message, User } from "../models/index.js";
import {
  BadRequest,
  CustomApiError,
  NotFound,
  Unauthorized,
} from "../errors/index.js";
import { emitEvent } from "../utils/eventEmit.js";
import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_ALERT,
} from "../constants/events.js";
import { StatusCodes } from "http-status-codes";
import { getOtherMembers } from "../lib/helper.js";
import {
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
} from "../utils/cloudinary.js";

const newGroupChat = async (req, res) => {
  // console.log("New group chat", req.body);
  // console.log("User ID:", req.user);
  // members are userId when we enter in postman!
  const { name, members = [] } = req.body;
  // console.log("Members:", members);
  const allMembers = [...members, req.user.userId].filter(
    (member) => member !== null
  );
  // console.log("All Members:", allMembers);

  try {
    const creatChatMembers = await Chat.create({
      name,
      groupChat: true,
      members: allMembers,
      creator: req.user.userId, // Ensure this is set correctly
    });

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
    emitEvent(
      req,
      REFETCH_ALERT,
      `Welcome all ${members} to the ${name} group`
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      createdChat: creatChatMembers,
      message: "Group chat created successfully",
    });
  } catch (error) {
    console.error("Error creating group chat:", error);
    throw new CustomApiError("Error creating group chat.");
  }
};

const getMyChats = async (req, res) => {
  // console.log("My Chats Received!", req.body);
  // console.log("User ID:", req.user.userId);

  // Find chats where the current user is a member, and populate 'avatar' and 'name' fields of members
  const chats = await Chat.find({ members: req.user.userId }).populate(
    "members",
    "avatar name"
  );

  // console.log("Chats are Found!", chats);

  if (!chats || chats.length === 0) {
    throw new BadRequest("No Chats found..");
  }

  // Transform the chats to a more suitable format for the front-end
  const transformChats = chats.map(({ _id, name, members, groupChat }) => {
    // Get the other members in the chat, excluding the current user
    const otherMembers = getOtherMembers(members, req.user.userId);

    // Return the transformed chat object
    return {
      _id,
      groupChat,
      // Determine the avatar(s) for the chat
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar?.url) // For group chats, use up to 3 members' avatars
        : [otherMembers.avatar?.url], // For direct chats, use the other member's avatar
      // Determine the name for the chat
      name: groupChat ? name : otherMembers?.name, // For group chats, use the chat name; for direct chats, use the other member's name
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.userId.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    chats: transformChats,
    message: "Chats fetched successfully",
  });
};

// show user own groups!!!
const getMyGroups = async (req, res) => {
  // console.log("my groups user id ", req.user.userId);

  // Find group chats where the current user is a member and the creator
  const groupsChats = await Chat.find({
    members: req.user.userId, // Query to find group chats where the current user is a member
    groupChat: true, // Ensure it's a group chat
    creator: req.user.userId, // Ensure the current user is the creator of the group chat
  }).populate("members", "name avatar"); // Populate 'members' field with 'name' and 'avatar' fields of user documents

  // if (!groupsChats || groupsChats.length === 0) {
  //   throw new BadRequest("No groups available for this user!");
  // }

  // Transform the group chat data into a suitable format for the front-end
  const transformedGroupChats = groupsChats.map(
    ({ _id, name, members, groupChat }) => ({
      _id, // Directly use the _id of the group chat
      groupChat, // Directly use the groupChat flag
      name, // Directly use the name of the group chat
      avatar: members.slice(0, 3).map(({ avatar }) => avatar?.url), // For each member, extract up to 3 avatar URLs
    })
  );

  return res.status(StatusCodes.OK).json({
    message: "Groups fetched successfully",
    success: true,
    groups: transformedGroupChats,
  });
};

const addGroupMembers = async (req, res) => {
  const { chatId, members } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new NotFound("Chats not found");
  }

  if (!chat.groupChat) {
    throw new BadRequest("This chat is not a group chat");
  }
  // Ensure that the current user is the creator of the group chat
  if (chat.creator.toString() !== req.user.userId.toString()) {
    throw new Unauthorized("You are not allowed to add Members to this group!");
  }

  // Fetch details of all members being added
  const allNewAddMembersPromise = members.map((member) =>
    User.findById(member, "name")
  );

  if (!allNewAddMembersPromise) {
    throw new BadRequest("Members not found");
  }

  const allNewAddMembers = await Promise.all(allNewAddMembersPromise);

  // make sure do not add duplicate members
  const detectDuplicateMembers = allNewAddMembers
    .filter((member) => !chat.members.includes(member._id.toString()))
    .map((i) => i._id);

  if (detectDuplicateMembers) {
    throw new BadRequest("You can't add duplicate members to a group chat");
  }

  const membersAdded = chat.members.push(...detectDuplicateMembers);

  if (membersAdded.length > 30) {
    throw new BadRequest("You can't add more than 30 members to a group chat");
  }

  await chat.save();

  // Emit real-time events to notify members about the addition of new members
  const allAddMembersNames = allNewAddMembers
    .map((member) => member.name)
    .join(", ");

  emitEvent(req, ALERT, chat.members, `${allAddMembersNames} has been added`);
  emitEvent(req, REFETCH_ALERT, chat.members);

  return res.status(StatusCodes.OK).json({
    message: "Members added successfully",
    success: true,
    // membersAdded,
    // chat,
  });
};

const removeGroupMembers = async (req, res) => {
  const { userId, chatId } = req.body;

  const [chat, thatUserRemove] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) {
    throw new NotFound("Chats not found");
  }

  if (!chat.groupChat) {
    throw new BadRequest("This chat is not a group chat");
  }

  if (chat.creator.toString() !== req.user.toString()) {
    throw new Unauthorized(
      "You are not allowed to remove Members from this group!"
    );
  }

  if (chat.members.length <= 3) {
    throw new BadRequest(
      "You can't remove members from a group chat with less than 3 members"
    );
  }

  // Filter out the user to be removed from the members list
  // This creates a new array excluding the user with userId
  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${thatUserRemove.name} has been removed`
  );
  emitEvent(req, REFETCH_ALERT, chat.members);

  return res.status(StatusCodes.OK).json({
    message: "Members removed successfully",
    success: true,
  });
};

const leaveGroup = async (req, res) => {
  const chatId = req.params.chatId;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new NotFound("Chats not found");
  }

  // Filter out the leaving user from the members list
  const findRemainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );

  if (findRemainingMembers.length < 2) {
    throw new BadRequest(
      "You can't remove members from a group chat with less than 2 members"
    );
  }

  // If the creator (admin) is leaving, transfer admin rights
  if (chat.creator.toString() === req.user.toString()) {
    //  Handles the scenario where there are no members left
    if (findRemainingMembers.length > 0) {
      // Randomly select a new admin from the remaining members
      const randomInt = crypto.randomInt(findRemainingMembers.length);
      const newCreator = removeGroupMembers[randomInt];
      chat.creator = newCreator;
    }
  } else {
    // If no members are left, the chat creator should be set to nul
    chat.creator = null;
  }
  chat.members = findRemainingMembers;

  await chat.save();
  emitEvent(req, ALERT, chat.members, `${req.user.name} has left the group`);
  emitEvent(req, REFETCH_ALERT, chat.members);

  return res.status(StatusCodes.OK).json({
    message: "You have left the group",
    success: true,
  });
};

const sendMessageFileAttachment = async (req, res) => {
  const { chatId } = req.body;

  const files = req.files;

  if (files.length === 0) {
    throw new BadRequest("Please upload at least one file.");
  }
  if (files.length > 5) {
    throw new BadRequest("You can't upload more than 5 files");
  }

  // Fetch chat and user data in parallel
  const [chat, user] = await Promise.all([
    Chat.findById(chatId).populate("members"),
    User.findById(req.user.userId, "name"),
  ]);

  // Check if the chat exists
  if (!chat) {
    throw new NotFound(
      "Chat not found. Please check the chat ID and try again."
    );
  }

  // Check if the user exists
  if (!user) {
    throw new NotFound(
      "User not found. Please ensure you are logged in and try again."
    );
  }

  // Upload files to cloud storage (like Cloudinary)
  const attachments = await uploadFilesToCloudinary(files);
  // console.log("Uploading" + attachments);

  const newMessageForDB = {
    content: "",
    attachments,
    sender: user._id,
    chat: chatId,
  };
  // console.log(newMessageForDB);

  // Save message to the database
  const savedMessage = await Message.create(newMessageForDB);

  if (!savedMessage) {
    throw new BadRequest(
      "Failed to create the message. Please try again later."
    );
  }

  // Prepare message object for real-time updates (to emit events)
  const messageForRealTime = {
    ...newMessageForDB,
    sender: {
      _id: user._id,
      name: user.name,
    },
  };

  // console.log(messageForRealTime);

  // Emit an event to notify chat members about the new attachment in real-time
  emitEvent(req, NEW_MESSAGE, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  // Emit an event to notify chat members about a new message alert in real-time
  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
    chatId,
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "File(s) uploaded successfully",
  });
};

const chatDetails = async (req, res) => {
  const { chatId } = req.params;
  // console.log("Chat ID:",chatId);

  if (!chatId) {
    throw new BadRequest("Chat ID is required");
  }

  // Check if the client requested to populate member details

  if (req.query.populate === "true") {
    const chat = await Chat.findById(chatId)
      .populate("members", "name avatar")
      .lean(); // Use lean() for better performance by returning plain JavaScript objects

    if (!chat) {
      throw new NotFound("Chat are not Found!");
    }

    chat.members = chat.members?.map((member) => ({
      _id: member?._id,
      name: member?.name || "Not Available",
      avatar: member?.avatar?.url || "Not Available",
    }));

    return res.status(StatusCodes.OK).json({
      message: "Chat Details Fetch Successfully!",
      success: true,
      chat,
    });
  } else {
    // Fetch chat by ID without populating the members field
    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new NotFound("Chats are not Found!");
    }
    return res.status(StatusCodes.OK).json({
      message: "Chat Details Fetch Successfully!",
      success: true,
      allChats: chat,
    });
  }
};

const renameGroup = async (req, res) => {
  const chatId = req.params.chatId;
  const { name } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new NotFound("Chats are not Found!");
  }

  if (!chat.groupChat) {
    throw new BadRequest("This chat is not a group chat");
  }

  if (chat.creator.toString() !== req.user.toString()) {
    throw new Unauthorized("You are not allowed to rename this group!");
  }

  chat.name = name;

  await chat.save();

  emitEvent(req, REFETCH_ALERT, chat?.members);

  return res.status(StatusCodes.OK).json({
    message: "Group renamed successfully",
    success: true,
  });
};

const deleteGroupChats = async (req, res) => {
  const chatId = req.params.chatId;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new NotFound("Chats are not Found!");
  }

  const members = chat.members;

  // Authorization check for group chat
  // Only the creator of the group chat can delete the group
  if (chat.groupChat && chat.creator.toString() !== req.user.toString()) {
    throw new Unauthorized("You are not allowed to delete this group!");
  }

  // Authorization check for private chat
  // Only members of the private chat can delete the chat
  // One-to-One (Private) Chats
  if (!chat.groupChat && !chat.members.includes(req.user.toString())) {
    throw new Unauthorized("You are not allowed to delete this chat!");
  }

  // from here we delete all messages as well as files, attachments on cloudinary

  // Find all messages in the chat that have attachments

  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });

  if (!messagesWithAttachments) {
    throw new NotFound("Messages are not Found!");
  }

  const public_ids = [];

  // Collect the public IDs of all attachments
  //  These public_ids are unique identifiers used by Cloudinary (or any other cloud storage service) to manage files
  messagesWithAttachments.forEach(({ attachments }) => {
    attachments.forEach(({ public_id }) => {
      public_ids.push(public_id);
    });
  });

  // Perform parallel deletion of:
  // 1. Files from Cloudinary
  // 2. The chat document from the database
  // 3. All messages associated with the chat from the database
  const filesDeleted = await Promise.all([
    deleteFilesFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId }),
  ]);

  if (!filesDeleted) {
    throw new NotFound("Files are not Found!");
  }

  emitEvent(req, REFETCH_ALERT, members);

  return res.status(StatusCodes.OK).json({
    message: "Group deleted successfully",
    success: true,
  });
};

const getMessages = async (req, res) => {
  const chatId = req.params.chatId;

  const { page = 1 } = req.query;

  const chatsPerPage = 20;
  const skip = (page - 1) * chatsPerPage;

  const [messages, totalMessageCounts] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(chatsPerPage)
      .populate("sender", "name avatar")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);

  if (!messages) {
    throw new NotFound("Messages are not Found!");
  }

  const totalPages = Math.ceil(totalMessageCounts / chatsPerPage) || 0;

  return res.status(StatusCodes.OK).json({
    success: true,
    messages: messages.reverse(),
    totalPages,
  });
};

export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addGroupMembers,
  removeGroupMembers,
  leaveGroup,
  sendMessageFileAttachment,
  chatDetails,
  renameGroup,
  deleteGroupChats,
  getMessages,
};
