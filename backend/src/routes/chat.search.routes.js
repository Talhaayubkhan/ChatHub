import express from "express";
const router = express.Router();

import {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addGroupMembers,
  removeGroupMembers,
  leaveGroup,
  sendFileAttachment,
  chatDetails,
  renameGroup,
} from "../controllers/chatController.js";
import { isAuthenticatedUser } from "../middlewares/authentication.js";
import { fileAttachmentMulter } from "../middlewares/multer.middleware.js";

router.use(isAuthenticatedUser);
router.route("/groupchat").post(newGroupChat);
router.route("/mychats").get(getMyChats);
router.route("/mychats/mygroups").get(getMyGroups);
router.route("/addmembers").put(addGroupMembers);
router.route("/removemember").delete(removeGroupMembers);
router.route("/leave/:chatid").delete(leaveGroup);
router.route("/message").post(fileAttachmentMulter, sendFileAttachment);

router.route("/:chatid").get(chatDetails).put(renameGroup).delete();
export default router;
