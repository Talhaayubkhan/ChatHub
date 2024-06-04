import express from "express";
const router = express.Router();

// import {
//   loginUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   searchChatUser,
// } from "../controllers/authController.js";
// import {
//   multerUploadFile,
//   singleAavatar,
// } from "../middlewares/multer.middleware.js";

import { newGroupChat } from "../controllers/chatController.js";
import { isAuthenticatedUser } from "../middlewares/authentication.js";

router.use(isAuthenticatedUser);
router.route("/groupchat").post(newGroupChat);
export default router;
