import express from "express";
import {
  adminDashboardStats,
  adminLogin,
  adminLogout,
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
router.route("/logout").get(isAuthenticatedUser, adminLogout);
router.use(isAuthenticatedUser);
router.route(authorizedPermission("admin"));
router.route("/users").get(getAllUsers);
router.route("/chats").get(getAllChats);
router.route("/messages").get(getAllMessages);
router.route("/stats").get(adminDashboardStats);

export default router;
