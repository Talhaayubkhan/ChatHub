import dotenv from "dotenv";

import connectDB from "./src/db/connect.js";
import { app } from "./src/app.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import { NEW_MESSAGE } from "./src/constants/events.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

// Create HTTP server and integrate with Socket.IO
const server = createServer(app);
const io = new Server(server, {});

io.on("connection", (socket) => {
  // console.log("Connection established", socket.id);

  socket.on(NEW_MESSAGE, ({ chatId, members, message }) => {
    const tempUser = {
      _id: "232&asd£*&^3",
      name: "Test User",
    };

    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: tempUser._id,
        name: tempUser.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
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
