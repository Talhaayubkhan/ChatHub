import connectDB from "./src/db/connect.js";
import { app } from "./src/app.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { handleNewMessage, handleDisconnect } from "./socketEvents.js";
import { NEW_MESSAGE } from "./src/constants/events.js";
import { corsOptions } from "./src/constants/config.js";
import cookieParser from "cookie-parser";
import { socketAuthentication } from "./src/middlewares/AuthHeadersBased.Authentication.js";

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
  console.log(`Socket connected: ${socket.id}`);

  socket.on(NEW_MESSAGE, (data) => handleNewMessage(io, socket, data));
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
