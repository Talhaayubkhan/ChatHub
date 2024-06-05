import express from "express";
const router = express.Router();

import { newGroupChat, getMyChats } from "../controllers/chatController.js";
import { isAuthenticatedUser } from "../middlewares/authentication.js";

router.use(isAuthenticatedUser);
router.route("/groupchat").post(newGroupChat);
router.route("/mychats").get(getMyChats);

export default router;
