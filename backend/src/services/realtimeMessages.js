import { BadRequest, NotFound, Unauthorized } from "../errors/index.js";

const MAX_MESSAGE_LENGTH = 2000;

const memberId = (member) => String(member?._id ?? member);

export const createRealtimeMessageService = ({
  ChatModel,
  MessageModel,
  registry,
}) => {
  const getAuthorizedChat = async ({ user, chatId }) => {
    if (!user?._id) throw new Unauthorized("Authentication is required");
    if (!chatId) throw new BadRequest("Chat ID is required");

    const chat = await ChatModel.findById(chatId);
    if (!chat) throw new NotFound("Chat not found");

    const authenticatedUserId = String(user._id);
    const memberIds = chat.members.map(memberId);
    if (!memberIds.includes(authenticatedUserId)) {
      throw new Unauthorized("You must be a chat member to perform this action");
    }

    return { chat, memberIds };
  };

  const getRecipientSocketIds = async ({ user, chatId }) => {
    const { memberIds } = await getAuthorizedChat({ user, chatId });
    return registry.getSocketIds(memberIds);
  };

  const sendMessage = async ({ user, chatId, content }) => {
    const normalizedContent = typeof content === "string" ? content.trim() : "";

    if (!normalizedContent) throw new BadRequest("Message cannot be empty");
    if (normalizedContent.length > MAX_MESSAGE_LENGTH) {
      throw new BadRequest("Message cannot exceed 2000 characters");
    }

    const { memberIds } = await getAuthorizedChat({ user, chatId });
    const senderId = String(user._id);
    const createdMessage = await MessageModel.create({
      chat: chatId,
      sender: senderId,
      content: normalizedContent,
    });
    const savedMessage =
      typeof createdMessage.toObject === "function"
        ? createdMessage.toObject()
        : createdMessage;
    const recipientSocketIds = registry.getSocketIds(memberIds);

    return {
      chatId,
      recipientSocketIds,
      message: {
        ...savedMessage,
        sender: {
          _id: senderId,
          name: user.name,
          avatar: user.avatar,
        },
      },
    };
  };

  return { sendMessage, getRecipientSocketIds };
};

export { MAX_MESSAGE_LENGTH };
