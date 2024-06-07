import express from "express";
const router = express.Router();

import {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addGroupMembers,
  removeGroupMembers,
  leaveGroup,
} from "../controllers/chatController.js";
import { isAuthenticatedUser } from "../middlewares/authentication.js";

router.use(isAuthenticatedUser);
router.route("/groupchat").post(newGroupChat);
router.route("/mychats").get(getMyChats);
router.route("/mychats/mygroups").get(getMyGroups);
router.route("/addmembers").put(addGroupMembers);
router.route("/removemembers").delete(removeGroupMembers);
router.route("/leave/:chatid").delete(leaveGroup);

export default router;
