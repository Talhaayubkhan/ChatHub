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
import {
  isAuthenticatedUser,
  authorizedPermission,
} from "../middlewares/authentication.js";
const router = express.Router();

router.route("/").get();
router
  .route("/admin-verification")
  .post(adminLoginVerifyValidator(), handleAdminValidationError, adminLogin);
router.route(isAuthenticatedUser);
router.route("/logout").get(authorizedPermission("admin"));
router.route("/users").get(authorizedPermission("admin"), getAllUsers);
router.route("/chats").get(authorizedPermission("admin"), getAllChats);
router.route("/messages").get(authorizedPermission("admin"), getAllMessages);
router.route("/stats").get(authorizedPermission("admin"), adminDashboardStats);

export default router;
