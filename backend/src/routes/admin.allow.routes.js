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

// TODO: letter if we use this
// import {
//   isAuthenticatedUser,
//   authorizedPermission,
// } from "../middlewares/authentication.js";
import {
  isAuthenticated,
  authPermisson,
} from "../middlewares/AuthHeadersBased.Authentication.js";
const router = express.Router();

router.route("/").get();
router
  .route("/login")
  .post(adminLoginVerifyValidator(), handleAdminValidationError, adminLogin);
router.route("/logout").get(isAuthenticated, adminLogout);

// Apply isAuthenticated middleware to all subsequent routes
router.use(isAuthenticated);

// Apply authPermission middleware to restrict access to admin-only routes
router.use(authPermisson("admin"));

router.route("/users").get(getAllUsers);
router.route("/chats").get(getAllChats);
router.route("/messages").get(getAllMessages);
router.route("/stats").get(adminDashboardStats);

export default router;
