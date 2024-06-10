import express from "express";
const router = express.Router();

import {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addGroupMembers,
  removeGroupMembers,
  leaveGroup,
  sendMessageFileAttachment,
  chatDetails,
  renameGroup,
  deleteGroupChats,
  getMessages,
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
router.route("/message").post(fileAttachmentMulter, sendMessageFileAttachment);
router.route("/message/:id").get(getMessages);

router
  .route("/:chatid")
  .get(chatDetails)
  .patch(renameGroup)
  .delete(deleteGroupChats);
export default router;
