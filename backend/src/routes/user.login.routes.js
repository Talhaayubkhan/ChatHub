import express from "express";
const router = express.Router();

import { login, newUser } from "../controllers/loginController";

router.route("/user").post(newUser);
router.route("/login").post(login);

export default router;
