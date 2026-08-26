import { StatusCodes } from "http-status-codes";
import { logger } from "../logger.js";
import { ValidationError } from "express-validation";
import mongoose from "mongoose";
import { toErrorResponse } from "../utils/errorResponse.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  logger.error(err?.message, { stack: err.stack });

  // Express-validation error
  if (err instanceof ValidationError) {
    const messages = err.details?.body
      ?.map((detail) => detail.message)
      .join(", ");
    return res.status(StatusCodes.BAD_REQUEST).json({
      message:
        messages || "Invalid input. Please check your data and try again.",
      success: false,
    });
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Database validation error. Please ensure your data is correct.",
      success: false,
    });
  }

  // Mongoose cast error (e.g., invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: `Invalid data format for ${err.path}. Please check your input.`,
      success: false,
    });
  }

  // Duplicate key error (MongoDB)
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue).join(", ");
    return res.status(StatusCodes.CONFLICT).json({
      message: `The value for ${duplicateField} already exists. Please use a different value.`,
      success: false,
    });
  }

  const response = toErrorResponse(err);
  return res.status(response.statusCode).json(response.body);
};

export default errorHandlerMiddleware;
