import dotenv from "dotenv";
import connectDB from "./src/db/connect.js";
import { app } from "./src/app.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import { NEW_MESSAGE } from "./src/constants/events.js";
import { getAllSocketIDs, userSocketIDs } from "./src/constants/sockets.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

// Create HTTP server and integrate with Socket.IO
const server = createServer(app);
const io = new Server(server, {});

io.on("connection", (socket) => {
  const user = {
    _id: "123@k009",
    name: "Test User",
  };

  // Store the mapping of user ID to socket ID
  const trackUserInChatApp = userSocketIDs.set(user._id.toString(), socket.id);
  console.log(trackUserInChatApp);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDatabase = {
      content: message,
      sender: user._id,
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    // Retrieve socket IDs for all members in the chat
    const memberSocket = getAllSocketIDs(members);
    io.to(memberSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(memberSocket).emit(NEW_MESSAGE, { NEW_MESSAGE });
    console.log("New message", messageForRealTime);
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
