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

import {
  isAuthenticatedAdmin,
  authPermisson,
} from "../middlewares/admin.authentication.middleware.js";
const router = express.Router();

router
  .route("/login")
  .post(adminLoginVerifyValidator(), handleAdminValidationError, adminLogin);
router.route("/logout").get(isAuthenticatedAdmin, adminLogout);

// Apply isAuthenticated middleware to all subsequent routes
router.use(isAuthenticatedAdmin);

// Apply authPermission middleware to restrict access to admin-only routes
router.use(authPermisson("admin"));

router.route("/").get(getAdminData);
router.route("/users").get(getAllUsers);
router.route("/chats").get(getAllChats);
router.route("/messages").get(getAllMessages);
router.route("/stats").get(adminDashboardStats);

export default router;
