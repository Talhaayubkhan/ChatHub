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
import {
  multerUploadFile,
  singleAavatar,
} from "../middlewares/multer.middleware.js";

import { isAuthenticatedUser } from "../middlewares/authentication.js";

router
  .route("/register")
  .post(
    singleAavatar,
    registerValidator(),
    handleValidationErrors,
    registerUser
  );
router
  .route("/login")
  .post(loginValidator(), handleValidationErrors, loginUser);

router.use(isAuthenticatedUser);
router.route("/logout").post(logoutUser);
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
