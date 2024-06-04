import { Chat } from "../models/Chat.Models.js";
import { BadRequest } from "../errors/index.js";
import { emitEevent } from "../utils/eventEmit.js";
export const newGroupChat = async (req, res) => {
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

  emitEevent;
};
