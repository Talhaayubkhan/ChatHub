import { Router } from "express";
const router = Router();

import { login, registerUser } from "../controllers/authController.js";
import {
  multerUploadFile,
  singleAavatar,
} from "../middlewares/multer.middleware.js";
router.route("/register").post(singleAavatar, registerUser);
router.route("/login").post(login);

export default router;
