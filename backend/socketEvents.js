import { v4 as uuid } from "uuid";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./src/constants/events.js";
import { getAllSocketIDs, userSocketIDs } from "./src/constants/sockets.js";
import NotFound from "./src/errors/NotFound.js";
import { Message } from "./src/models/Message.Models.js";
import BadRequest from "./src/errors/BadRequestError.js";

const handleNewMessage = async (socket, { chatId, members, message }) => {
  const messageForRealTime = {
    chat: chatId,
    id: uuid(),
    sender: {
      _id: user._id,
      name: user.name,
    },
    content: message,
    createdAt: new Date(),
  };

  const messageForDatabse = {
    chatId,
    senderId: user._id,
    content: message,
    createdAt: new Date(),
  };

  const memberSocket = getAllSocketIDs(members);

  if (!memberSocket) {
    throw new NotFound("Not found member socket IDs");
  }
  io.to(memberSocket).emit(NEW_MESSAGE, {
    chat: chatId,
    message: messageForRealTime,
  });
  io.to(memberSocket).emit(NEW_MESSAGE_ALERT, {
    chatId,
  });

  try {
    await Message.create(messageForDatabse);
  } catch (error) {
    throw new BadRequest("Couldn't create message for databse!", error.message);
  }
};

const handleDisconnect = (socket) => {
  console.log("User disconnected");
};

export { handleNewMessage, handleDisconnect };
