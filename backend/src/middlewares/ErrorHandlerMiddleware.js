import { StatusCodes } from "http-status-codes";
import {
  CustomApiError,
  Unauthenticated,
  Unauthorized,
} from "../errors/index.js";
import { ValidationError } from "express-validation";
import mongoose from "mongoose";
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);

  let defaultErrorResponse = {
    message: "Internal Server Error",
    success: false,
  };

  // Handle validation errors (from express-validation)
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      msg:
        err.message ||
        "A validation error occurred. Please check your input and try again",
      success: false,
    });
  }

  // Handle mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg:
        err.message ||
        "Database validation error occurred. Please check your input and try again",
      success: false,
    });
  }

  // Handle mongoose cast errors (e.g., invalid ObjectId)

  if (err instanceof mongoose.Error.CastError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Invalid ObjectId. Please check your input and try again",
      success: false,
    });
  }

  // Handle duplicate key errors (MongoDB)

  if (err.code === 11000) {
    const duplicateKeyError = Object.keys(err.keyValue).join(",");

    return res.status(StatusCodes.CONFLICT).json({
      msg: `Duplicate key error:${duplicateKeyError} already exists, Please provide a unique value`,
      success: false,
    });
  }

  // Handle JWT unauthorized errors
  if (err instanceof Unauthenticated) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Authentication  . You must be logged in",
      success: false,
    });
  }

  if (err instanceof Unauthorized) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: "Unauthorized access. You don't have the necessary permissions",
      success: false,
    });
  }

  // Handle custom API errors
  if (err instanceof CustomApiError) {
    const statusCode = err.statusCode || StatusCodes.BAD_REQUEST;
    const message =
      err.message || "An unexpected error occurred. Please try again later";
    return res.status(statusCode).json({
      msg: message,
      success: false,
    });
  }

  // Handle all other errors with a default message

  return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    ...defaultErrorResponse,
    msg: err.message || defaultErrorResponse.message,
  });
};

export default errorHandlerMiddleware;
