import connectDB from "./src/db/connect.js";
import { app } from "./src/app.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { handleNewMessage, handleDisconnect } from "./socketEvents.js";
import {
  NEW_MESSAGE,
  START_TYPING_MESSAGE,
  STOP_TYPING_MESSAGE,
} from "./src/constants/events.js";
import { corsOptions } from "./src/constants/config.js";
import cookieParser from "cookie-parser";
import { socketAuthentication } from "./src/middlewares/AuthHeadersBased.Authentication.js";
import { getAllSocketIDs } from "./src/constants/sockets.js";

const PORT = process.env.PORT || 8000;

// Create HTTP server and integrate with Socket.IO
const server = createServer(app);
const io = new Server(server, { cors: corsOptions });

app.set("io", io);

// Middleware for socket authentication
io.use((socket, next) => {
  cookieParser(process.env.JWT_SECRET)(
    socket.request,
    socket.request.res || {},
    async (err) => {
      if (err) return next(err);
      await socketAuthentication(err, socket, next);
    }
  );
});

io.on("connection", (socket) => {
  // console.log(`Socket connected: ${socket.id}`);

  socket.on(NEW_MESSAGE, (data) => handleNewMessage(io, socket, data));
  socket.on(START_TYPING_MESSAGE, ({ members, chatId }) => {
    // console.log("typing", members, chatId);
    const socketMembers = getAllSocketIDs(members);

    socket.to(socketMembers).emit(START_TYPING_MESSAGE, { chatId });
  });
  socket.on(STOP_TYPING_MESSAGE, ({ members, chatId }) => {
    // console.log("typing", members, chatId);
    const socketMembers = getAllSocketIDs(members);

    socket.to(socketMembers).emit(STOP_TYPING_MESSAGE, { chatId });
  });
  socket.on("disconnect", () => handleDisconnect(socket));
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
