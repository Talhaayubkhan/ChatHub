import dotenv from "dotenv";
dotenv.config();

// Automatically handles async errors without needing try-catch in each routes
import express from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

const app = express();

// Built-in middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:4173",
      "http://localhost:3000",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes implementation
import authRouter from "./routes/auth.login.routes.js";
import searchChatRouter from "./routes/chat.search.routes.js";
import adminRouter from "./routes/admin.allow.routes.js";

// User-Created middleware
import notFoundMiddleware from "./middlewares/NotFound.js";
import errorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware.js";

// use routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", searchChatRouter);
app.use("/api/v1/admin", adminRouter);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export { app };
