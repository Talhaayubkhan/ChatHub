import express from "express";
const router = express.Router();

import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  searchUser,
} from "../controllers/authController.js";
import {
  multerUploadFile,
  singleAavatar,
} from "../middlewares/multer.middleware.js";

import { isAuthenticatedUser } from "../middlewares/authentication.js";

router.route("/register").post(singleAavatar, registerUser);
router.route("/login").post(loginUser);

// app.use(isAuthenticatedUser);
router.route("/logout").get(isAuthenticatedUser, logoutUser);
router.route("/user").get(isAuthenticatedUser, getUserProfile);
router.route("/search").get(isAuthenticatedUser, searchUser);
export default router;
