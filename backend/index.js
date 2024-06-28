import dotenv from "dotenv";

import connectDB from "./src/db/connect.js";
import { app } from "./src/app.js";

// import { createUser } from "./src/seeders/userSeeders.js";
// import {
//   createGroupChats,
//   createMessageInChats,
//   createSingleChats,
// } from "./src/seeders/chatSeeders.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error While Connecting to Database", err.message);
  });
