import express from "express";
const router = express.Router();

import {
  newGroupChatValidator,
  addGroupMemberValidator,
  removeGroupValidator,
  fileAttachmentGroupValidator,
  chatIdGroupValidator,
  handleGroupValidationErrors,
  renameGroupValidator,
} from "../lib/chatValidators.js";
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
router
  .route("/groupchat")
  .post(newGroupChatValidator(), handleGroupValidationErrors, newGroupChat);
router.route("/mychats").get(getMyChats);
router.route("/mychats/mygroups").get(getMyGroups);
router
  .route("/addmembers")
  .put(addGroupMemberValidator(), handleGroupValidationErrors, addGroupMembers);
router
  .route("/removemember")
  .delete(
    removeGroupValidator(),
    handleGroupValidationErrors,
    removeGroupMembers
  );
router
  .route("/leave/:chatid")
  .delete(chatIdGroupValidator(), handleGroupValidationErrors, leaveGroup);
router
  .route("/message")
  .post(
    fileAttachmentMulter,
    fileAttachmentGroupValidator(),
    handleGroupValidationErrors,
    sendMessageFileAttachment
  );
router
  .route("/message/:chatId")
  .get(chatIdGroupValidator(), handleGroupValidationErrors, getMessages);

router
  .route("/:chatId")
  .get(chatIdGroupValidator(), handleGroupValidationErrors, chatDetails)
  .patch(renameGroupValidator(), handleGroupValidationErrors, renameGroup)
  .delete(
    chatIdGroupValidator(),
    handleGroupValidationErrors,
    deleteGroupChats
  );
export default router;
