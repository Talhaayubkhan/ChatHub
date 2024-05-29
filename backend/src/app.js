import express from "express";
const app = express();

// built in middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// routes
import authRouter from "./routes/auth.login.routes.js";

// use routes
app.use("/api/v1/auth", authRouter);

export { app };
