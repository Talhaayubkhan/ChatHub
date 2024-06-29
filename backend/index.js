import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/db/connect.js";
import { app } from "./src/app.js";
import { Server } from "socket.io";

// import { createUser } from "./src/seeders/userSeeders.js";
// import {
//   createGroupChats,
//   createMessageInChats,
//   createSingleChats,
// } from "./src/seeders/chatSeeders.js";

const PORT = process.env.PORT || 8000;

// Create HTTP server and integrate with Socket.IO
const io = new Server(app, {});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error While Connecting to Database", err.message);
  });
