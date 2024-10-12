import express from "express";
import {
  adminDashboardStats,
  adminLogin,
  adminLogout,
  getAdminData,
  getAllChats,
  getAllMessages,
  getAllUsers,
} from "../controllers/adminController.js";
import {
  adminLoginVerifyValidator,
  handleAdminValidationError,
} from "../lib/admin.Validator.js";

import { isAuthenticatedAdmin } from "../middlewares/admin.authentication.middleware.js";
const router = express.Router();

router
  .route("/login")
  .post(adminLoginVerifyValidator(), handleAdminValidationError, adminLogin);

// Apply isAuthenticated middleware to all subsequent routes
router.use(isAuthenticatedAdmin);

router.route("/logout").get(adminLogout);
router.route("/").get(getAdminData);
router.route("/users").get(getAllUsers);
router.route("/chats").get(getAllChats);
router.route("/messages").get(getAllMessages);
router.route("/stats").get(adminDashboardStats);

export default router;
