import { Chat } from "../models/Chat.Models.js";
import { BadRequest } from "../errors/index.js";
import { emitEvent } from "../utils/eventEmit.js";
import { ALERT, REFETCH_ALERT } from "../constants/events.js";
import { StatusCodes } from "http-status-codes";
const newGroupChat = async (req, res) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    throw new BadRequest("Group chat requires at least 3 members");
  }

  const allMembers = [...members, req.user];

  const creatChatMembers = await Chat.create({
    name,
    groupChat: true,
    members: allMembers,
    creator: req.user,
  });

  emitEvent(req, ALERT, allMembers, `Wlcome to ${name} group`);
  emitEvent(req, REFETCH_ALERT, members);

  return res.status(StatusCodes.CREATED).json({
    message: "Group chat created successfully",
    success: true,
  });
};

const getMyChats = async (req, res) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "avatar name"
  );
  if (!chats) {
    throw new BadRequest("No Chats found..");
  }

  return res.status(StatusCodes.OK).json({
    message: "Chats fetched successfully",
    success: true,
    chats,
  });
};

export { newGroupChat, getMyChats };
