import { Router } from "express";
const router = Router();

import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
} from "../controllers/authController.js";
import {
  multerUploadFile,
  singleAavatar,
} from "../middlewares/multer.middleware.js";
router.route("/register").post(singleAavatar, registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;
