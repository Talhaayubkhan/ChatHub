import { Chat } from "../models/Chat.Models.js";
import { BadRequest } from "../errors/index.js";
import { emitEvent } from "../utils/eventEmit.js";
import { ALERT, REFETCH_ALERT } from "../constants/events.js";
import { StatusCodes } from "http-status-codes";
import { getOtherMembers } from "../../lib/helper.js";

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
    // creatChatMembers,
    success: true,
  });
};

const getMyChats = async (req, res) => {
  // Find chats where the current user is a member, and populate 'avatar' and 'name' fields of members
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "avatar name"
  );

  if (!chats || chats.length === 0) {
    throw new BadRequest("No Chats found..");
  }

  // Transform the chats to a more suitable format for the front-end
  const transformChats = chats.map(({ _id, name, members, groupChat }) => {
    // Get the other members in the chat, excluding the current user
    const otherMembers = getOtherMembers(members, req.user);

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
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });

  return res.status(StatusCodes.OK).json({
    message: "Chats fetched successfully",
    success: true,
    chats: transformChats,
  });
};

// show user own groups!!!
const getMyGroups = async (req, res) => {
  // Find group chats where the current user is a member and the creator
  const groupsChats = await Chat.find({
    members: req.user, // Query to find group chats where the current user is a member
    groupChat: true, // Ensure it's a group chat
    creator: req.user, // Ensure the current user is the creator of the group chat
  }).populate("members", "name avatar"); // Populate 'members' field with 'name' and 'avatar' fields of user documents

  if (!groupsChats || groupsChats.length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No groups available for this user!!", success: false });
  }

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

const newAddMembers = async (req, res) => {
  const { chatId, members } = req.body;

  const chat = Chat.findById(chatId);

  if (!chat) {
    throw new BadRequest("Chat not found");
  }
};

export { newGroupChat, getMyChats, getMyGroups, newAddMembers };
