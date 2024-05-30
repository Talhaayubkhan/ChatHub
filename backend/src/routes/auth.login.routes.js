import { Router } from "express";
const router = Router();

import { login, registerUser } from "../controllers/authController.js";
import { multerUploadFile } from "../middlewares/multer.middleware.js";
router.route("/register").post(multerUploadFile, registerUser);
router.route("/login").post(login);

export default router;
