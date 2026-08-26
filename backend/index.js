/**
 * Main Server Entry Point
 * Sets up HTTP server, Socket.IO, and starts the application
 */

import connectDB from "./src/db/connect.js";
import { app } from "./src/app.js";
import { Server } from "socket.io";
import { createServer } from "http";
import {
  handleNewMessage,
  handleTyping,
  handleDisconnect,
} from "./socketEvents.js";
import {
  NEW_MESSAGE,
  START_TYPING_MESSAGE,
  STOP_TYPING_MESSAGE,
} from "./src/constants/events.js";
import { corsOptions } from "./src/constants/config.js";
import cookieParser from "cookie-parser";
import { socketAuthentication } from "./src/middlewares/AuthHeadersBased.Authentication.js";
import { socketRegistry } from "./src/constants/sockets.js";

const PORT = process.env.PORT || 8000;

// Create HTTP server and integrate with Socket.IO
const server = createServer(app);
const io = new Server(server, { 
  cors: corsOptions,
  pingTimeout: 60000,
  pingInterval: 25000
});

// Make io instance available to routes
app.set("io", io);

// Socket.IO authentication middleware
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

// Handle socket connections
io.on("connection", (socket) => {
  const userId = socket.user._id.toString();
  socketRegistry.addSocket(userId, socket.id);

  // Handle new messages
  socket.on(NEW_MESSAGE, (data, callback) =>
    handleNewMessage(io, socket, data, callback)
  );
  
  // Handle typing indicators
  socket.on(START_TYPING_MESSAGE, (data) =>
    handleTyping(socket, START_TYPING_MESSAGE, data)
  );
  
  socket.on(STOP_TYPING_MESSAGE, (data) =>
    handleTyping(socket, STOP_TYPING_MESSAGE, data)
  );
  
  // Handle disconnection
  socket.on("disconnect", () => {
    socketRegistry.removeSocket(userId, socket.id);
    handleDisconnect(socket);
  });
});

// Start server after database connection
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to database:", err.message);
    process.exit(1);
  });
