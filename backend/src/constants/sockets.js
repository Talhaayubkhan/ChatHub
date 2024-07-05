import { BadRequest } from "../errors/index.js";

// Initialize a Map to store user IDs and their corresponding socket IDs
export const userSocketIDs = new Map();

// Function to retrieve socket IDs of given users
const getAllSocketIDs = (users = []) => {
  // Map user IDs to their corresponding socket IDs
  const sockets = users.map((user) => userSocketIDs.get(user._id.toString()));

  if (!sockets || sockets.length === 0) {
    throw new BadRequest("No active users connected");
  }
  return sockets;
};

export { getAllSocketIDs };
