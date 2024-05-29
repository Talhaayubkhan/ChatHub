import { Router } from "express";
const router = Router();

import { login, registerUser } from "../controllers/authController.js";

router.route("/register").post(registerUser);
router.route("/login").post(login);

export default router;
