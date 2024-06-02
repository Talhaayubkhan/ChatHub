import { Router } from "express";
const router = Router();

import { loginUser, registerUser } from "../controllers/authController.js";
import {
  multerUploadFile,
  singleAavatar,
} from "../middlewares/multer.middleware.js";
router.route("/register").post(singleAavatar, registerUser);
router.route("/login").post(loginUser);

export default router;
