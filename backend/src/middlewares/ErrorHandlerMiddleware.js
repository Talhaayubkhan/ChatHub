import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "../errors/index.js";
import { ValidationError } from "express-validation";
import mongoose from "mongoose";
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.error(err);

  // Handle validation errors (from express-validation)

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      success: false,
      msg:
        err.message ||
        "A validation error occurred. Please check your input and try again",
    });
  }

  // Handle mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg:
        err.message ||
        "Database validation error occurred. Please check your input and try again",
    });
  }

  // Handle mongoose cast errors (e.g., invalid ObjectId)

  if (err instanceof mongoose.Error.CastError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Invalid ObjectId. Please check your input and try again",
    });
  }

  // Handle duplicate key errors (MongoDB)

  if (err.code === 11000) {
    const duplicateKeyError = Object.keys(err.keyValue).join(",");

    return res.status(StatusCodes.CONFLICT).json({
      success: false,
      msg: `Duplicate key error:${duplicateKeyError} already exists, Please provide a unique value`,
    });
  }

  // Handle JWT unauthorized errors
  if (err.name === "UnauthorizedError") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      msg: "Unauthorized access. Please login and try again",
    });
  }

  // Handle custom API errors
  if (err instanceof CustomApiError) {
    const statusCode = err?.statusCode || StatusCodes.BAD_REQUEST;
    const message =
      err.message || "An unexpected error occurred. Please try again later";
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  // Handle all other errors with a default message

  return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandlerMiddleware;
