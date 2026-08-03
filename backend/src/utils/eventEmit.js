/**
 * Emit event to specified users via Socket.IO
 * @param {Request} req - Express request object (contains app with io instance)
 * @param {string} event - Event name to emit
 * @param {Array} users - Array of user IDs to emit event to
 * @param {any} data - Data to send with the event
 */
import { getAllSocketIDs } from "../constants/sockets.js";

export const emitEvent = (req, event, users, data) => {
  const io = req.app?.get("io");

  if (!io) {
    console.error("Socket.IO instance not found on app");
    return;
  }

  if (!Array.isArray(users)) {
    console.error("Users must be an array", users);
    return;
  }

  const userSockets = getAllSocketIDs(users);
  const validSockets = userSockets.filter(socketId => socketId !== undefined);

  if (validSockets.length > 0) {
    io.to(validSockets).emit(event, data);
  }
};
