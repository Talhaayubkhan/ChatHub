import { v4 as uuid } from "uuid";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./src/constants/events.js";
import { getAllSocketIDs, userSocketIDs } from "./src/constants/sockets.js";
import NotFound from "./src/errors/NotFound.js";
import { Message } from "./src/models/Message.Models.js";
import { BadRequest, Unauthenticated } from "./src/errors/index.js";

const handleNewMessage = async (io, socket, { chatId, members, message }) => {
  const user = socket?.user;
  // console.log(user);
  if (!user) {
    console.error(
      `Connection attempt failed: No user attached to socket with ID ${socket.id}`
    );

    throw new Unauthenticated(
      "Authentication failed: No user found in socket. Please ensure the user is authenticated."
    );
  }

  userSocketIDs.set(user._id.toString(), socket.id);

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
  // console.log("Emitting the message", messageForRealTime);

  const messageForDatabse = {
    chat: chatId,
    sender: user._id,
    content: message,
    createdAt: new Date(),
  };

  const memberSocket = getAllSocketIDs(members);
  // console.log(memberSocket);

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
    console.error("Database creation error:", error); // Log the error

    throw new BadRequest(
      "Couldn't create message for database!",
      error.message
    );
  }
};

const handleDisconnect = (socket) => {
  console.log("User disconnected");
};

export { handleNewMessage, handleDisconnect };
