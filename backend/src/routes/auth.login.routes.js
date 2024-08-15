import express from "express";
const router = express.Router();
import {
  registerValidator,
  loginValidator,
  handleValidationErrors,
  sendFriendRequestValidation,
  acceptFriendRequestValidation,
} from "../lib/auth.Validators.js";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getAllNotifications,
  getMyAllFriends,
} from "../controllers/authController.js";
import { multerUploadFile, singleAavatar } from "../utils/multerConfig.js";
import { loginLimiter, registerLimiter } from "../utils/rateLimiter.js";
import { isAuthenticated } from "../middlewares/AuthHeadersBased.Authentication.js";

// Routes without authentication
router
  .route("/register")
  .post(
    singleAavatar,
    registerLimiter,
    registerValidator(),
    handleValidationErrors,
    registerUser
  );

router
  .route("/login")
  .post(loginValidator(), handleValidationErrors, loginUser);

router.route("/logout").post(logoutUser); // Consider adding authentication if necessary

// Apply isAuthenticated to routes that need authentication
router.use(isAuthenticated);
router.route("/user").get(getUserProfile);
router.route("/search").get(searchUser);
router
  .route("/send-request")
  .post(
    sendFriendRequestValidation(),
    handleValidationErrors,
    sendFriendRequest
  );
router
  .route("/accept-request")
  .post(
    acceptFriendRequestValidation(),
    handleValidationErrors,
    acceptFriendRequest
  );
router.route("/notifications").get(getAllNotifications);
router.route("/friends").get(getMyAllFriends);

export default router;
