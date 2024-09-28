import { getAllSocketIDs } from "../constants/sockets.js";

export const emitEvent = (req, users, data, event) => {
  // console.log("emitEvent", req, users, data, event);

  if (!Array.isArray(users)) {
    console.error("emitEvent error: users is not an array. Got:", users);
    return;
  }

  const io = req.app.get("io");
  // console.log(io);

  const userSocket = getAllSocketIDs(users);

  if (userSocket.length === 0) {
    console.error("emitEvent error: No socket IDs found for users.");
    return;
  }

  io.to(userSocket).emit(event, data);
};
