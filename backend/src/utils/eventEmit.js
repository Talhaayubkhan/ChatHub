import { getAllSocketIDs } from "../constants/sockets.js";

export const emitEvent = (req, users, data, event) => {
  // console.log("Users passed to emitEvent:", users); // Debugging
  const io = req.app?.get("io");

  if (!Array.isArray(users)) {
    // console.error("Users is not an array", users); // Additional Debugging
    return;
  }

  const userSocket = getAllSocketIDs(users);

  io.to(userSocket).emit(event, data);
};
