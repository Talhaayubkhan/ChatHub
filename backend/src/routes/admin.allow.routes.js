import express from "express";
import {
  adminDashboardStats,
  adminLogin,
  getAllChats,
  getAllMessages,
  getAllUsers,
} from "../controllers/adminController.js";
import {
  adminLoginVerifyValidator,
  handleAdminValidationError,
} from "../lib/admin.Validator.js";
const router = express.Router();

router.route("/").get();
router
  .route("/verify")
  .post(adminLoginVerifyValidator(), handleAdminValidationError, adminLogin);
router.route("/logout").get();
router.route("/users").get(getAllUsers);
router.route("/chats").get(getAllChats);
router.route("/messages").get(getAllMessages);
router.route("/stats").get(adminDashboardStats);

export default router;
