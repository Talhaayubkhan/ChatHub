import("express-async-errors");
import express from "express";
import cookieParser from "cookie-parser";
const app = express();

// built in middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser(process.env.JWT_SECRET));

// routes implementation
import authRouter from "./routes/auth.login.routes.js";
import searchChatRouter from "./routes/chat.search.routes.js";

// user created middleware
import notFoundMiddleware from "./middlewares/NotFound.js";
import errorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware.js";

// use routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", searchChatRouter);

// error handler middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

export { app };
