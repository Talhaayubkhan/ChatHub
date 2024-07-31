import connectDB from "./src/db/connect.js";
import { app } from "./src/app.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./src/constants/events.js";
import { getAllSocketIDs, userSocketIDs } from "./src/constants/sockets.js";
import NotFound from "./src/errors/NotFound.js";
import { Message } from "./src/models/Message.Models.js";
import BadRequest from "./src/errors/BadRequestError.js";

// dotenv.config();
const PORT = process.env.PORT || 8000;

// Create HTTP server and integrate with Socket.IO
const server = createServer(app);
const io = new Server(server, {});

io.on("connection", (socket) => {
  const user = {
    _id: "123@09^%$£",
    name: "Temp User",
  };

  const socketID = userSocketIDs.set(user._id.toString(), socket.id);
  console.log(socketID);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
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
      throw new BadRequest(
        "Couldn't create message for databse!",
        error.message
      );
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error While Connecting to Database", err.message);
  });
