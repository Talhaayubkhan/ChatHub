import {
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
} from "./src/constants/events.js";
import { socketRegistry } from "./src/constants/sockets.js";
import { Chat } from "./src/models/Chat.Models.js";
import { Message } from "./src/models/Message.Models.js";
import { createRealtimeMessageService } from "./src/services/realtimeMessages.js";

const messageService = createRealtimeMessageService({
  ChatModel: Chat,
  MessageModel: Message,
  registry: socketRegistry,
});

const handleNewMessage = async (io, socket, data = {}, callback) => {
  const acknowledge = typeof callback === "function" ? callback : () => {};

  try {
    const result = await messageService.sendMessage({
      user: socket.user,
      chatId: data.chatId,
      content: data.message,
    });

    io.to(result.recipientSocketIds).emit(NEW_MESSAGE, {
      chatId: result.chatId,
      message: result.message,
    });
    socket.to(result.recipientSocketIds).emit(NEW_MESSAGE_ALERT, {
      chatId: result.chatId,
    });
    acknowledge({ ok: true, message: result.message });
  } catch (error) {
    acknowledge({
      ok: false,
      error: error?.message || "Unable to send message",
    });
  }
};

const handleTyping = async (socket, eventName, data = {}) => {
  try {
    const recipientSocketIds = await messageService.getRecipientSocketIds({
      user: socket.user,
      chatId: data.chatId,
    });
    socket.to(recipientSocketIds).emit(eventName, { chatId: data.chatId });
  } catch {
    // Typing indicators are best-effort and must not interrupt the connection.
  }
};

const handleDisconnect = () => {};

export { handleNewMessage, handleTyping, handleDisconnect };
