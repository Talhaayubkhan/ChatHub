import express from "express";
const router = express.Router();

import {
  newGroupChatValidator,
  addGroupMemberValidator,
  removeGroupValidator,
  multipleFilesUploadGroupValidator,
  chatIdGroupValidator,
  handleGroupValidationErrors,
  renameGroupValidator,
} from "../lib/chat.Validators.js";
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
import { isAuthenticated } from "../middlewares/AuthHeadersBased.Authentication.js";
import { multipleFilesUpload } from "../utils/multerConfig.js";

router.use(isAuthenticated);
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
  .route("/leave/:chatId")
  .delete(chatIdGroupValidator(), handleGroupValidationErrors, leaveGroup);
router
  .route("/message")
  .post(
    multipleFilesUpload,
    multipleFilesUploadGroupValidator(),
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
