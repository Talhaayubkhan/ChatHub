import connectDB from "./src/db/connect.js";
import { app } from "./src/app.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { handleNewMessage, handleDisconnect } from "./socketEvents.js";

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

  socket.on(NEW_MESSAGE, (data) => handleNewMessage(socket, data));

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
