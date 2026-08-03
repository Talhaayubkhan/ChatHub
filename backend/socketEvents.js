/**
 * Socket Events Handler
 * Handles real-time messaging events like new messages and typing indicators
 */

import { v4 as uuid } from "uuid";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./src/constants/events.js";
import { getAllSocketIDs, userSocketIDs } from "./src/constants/sockets.js";
import NotFound from "./src/errors/NotFound.js";
import { Message } from "./src/models/Message.Models.js";
import { BadRequest, Unauthenticated } from "./src/errors/index.js";

/**
 * Handle new message event
 * @param {Server} io - Socket.IO server instance
 * @param {Socket} socket - Client socket
 * @param {Object} data - Message data containing chatId, members, and message content
 */
const handleNewMessage = async (io, socket, { chatId, members, message }) => {
  const user = socket?.user;
  
  // Validate user authentication
  if (!user) {
    throw new Unauthenticated(
      "Authentication failed: No user found in socket. Please ensure the user is authenticated."
    );
  }

  // Store user's socket ID for real-time communication
  userSocketIDs.set(user._id.toString(), socket.id);

  // Prepare message object for real-time emission to clients
  const messageForRealTime = {
    chat: chatId,
    _id: uuid(),
    sender: {
      _id: user._id,
      name: user.name,
    },
    content: message,
    createdAt: new Date().toISOString(),
  };

  // Prepare message object for database storage
  const messageForDatabase = {
    chat: chatId,
    sender: user._id,
    content: message,
    createdAt: new Date().toISOString(),
  };

  // Get socket IDs of all chat members
  const memberSockets = getAllSocketIDs(members);
  
  // Filter out undefined socket IDs
  const validMemberSockets = memberSockets.filter(socketId => socketId !== undefined);

  if (!validMemberSockets || validMemberSockets.length === 0) {
    throw new NotFound("No valid member socket IDs found");
  }

  // Emit new message event to all chat members
  io.to(validMemberSockets).emit(NEW_MESSAGE, {
    chatId,
    message: messageForRealTime,
  });
  
  // Emit new message alert to notify members
  io.to(validMemberSockets).emit(NEW_MESSAGE_ALERT, {
    chatId,
  });

  // Save message to database
  try {
    await Message.create(messageForDatabase);
  } catch (error) {
    console.error("Database creation error:", error);
    throw new BadRequest(
      "Couldn't create message in database!",
      error.message
    );
  }
};

/**
 * Handle socket disconnect event
 * @param {Socket} socket - Disconnected socket
 */
const handleDisconnect = (socket) => {
  console.log("User disconnected:", socket.id);
};

export { handleNewMessage, handleDisconnect };
