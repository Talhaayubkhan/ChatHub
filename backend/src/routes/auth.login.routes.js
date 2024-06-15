import express from "express";
const router = express.Router();

import {
  registerValidator,
  loginValidator,
  handleValidationErrors,
} from "../lib/authValidators.js";
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

export default router;
