import express from "express";
const router = express.Router();

import {
  newGroupChat,
  getMyChats,
  getMyGroups,
  newAddMembers,
} from "../controllers/chatController.js";
import { isAuthenticatedUser } from "../middlewares/authentication.js";

router.use(isAuthenticatedUser);
router.route("/groupchat").post(newGroupChat);
router.route("/mychats").get(getMyChats);
router.route("/mychats/mygroups").get(getMyGroups);
router.route("/addmembers").put(newAddMembers);

export default router;
