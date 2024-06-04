import { Router } from "express";
const router = Router();

import {
  loginUser,
  registerUser,
  // logoutUser,
  // getUserProfile,
} from "../controllers/authController.js";
import {
  multerUploadFile,
  singleAavatar,
} from "../middlewares/multer.middleware.js";

import { isAuthenticatedUser } from "../middlewares/authentication.js";

router.route("/register").post(singleAavatar, registerUser);
router.route("/login").post(isAuthenticatedUser, loginUser);
// router.route("/logout").post(logoutUser);

export default router;
