// import { StatusCodes } from "http-status-codes";
// import { BadRequest, CustomApiError } from "../errors/index.js";
// import { logger } from "../logger.js";
// import { ValidationError } from "express-validation";
// import mongoose from "mongoose";

// const errorHandlerMiddleware = (err, req, res, next) => {
//   logger.error(err?.message, { stack: err.stack });

//   let defaultErrorResponse = {
//     message: "Internal Server Error",
//     success: false,
//   };

//   // Handle validation errors (from express-validation)
//   if (err instanceof ValidationError) {
//     return res.status(err.statusCode).json({
//       msg:
//         err.details?.body?.map((detail) => detail.message).join(",") ||
//         "A validation error occurred. Please check your input and try again",
//       success: false,
//     });
//   }

//   // Handle mongoose validation errors
//   if (err instanceof mongoose.Error.ValidationError) {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       msg:
//         err.message ||
//         "Database validation error occurred. Please check your input and try again",
//       success: false,
//     });
//   }

//   // Handle mongoose cast errors (e.g., invalid ObjectId)

//   if (err instanceof mongoose.Error.CastError) {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       msg: `Invalid ${err?.path}: ${err?.value}. Please check your input and try again`,
//       success: false,
//     });
//   }

//   // Handle duplicate key errors (MongoDB)

//   if (err.code === 11000) {
//     const duplicateKeyError = Object.keys(err.keyValue).join(",");

//     return res.status(StatusCodes.CONFLICT).json({
//       msg: `Duplicate key error:${duplicateKeyError} already exists, Please provide a unique value`,
//       success: false,
//     });
//   }

//   // Handle bad request errors
//   if (err instanceof BadRequest) {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       msg: err.message || "Bad Request. Please check your input and try again",
//       success: false,
//     });
//   }

//   // Handle custom API errors
//   if (err instanceof CustomApiError) {
//     const statusCode = err.statusCode || StatusCodes.BAD_REQUEST;
//     const message =
//       err.message || "An unexpected error occurred. Please try again later";
//     return res.status(statusCode).json({
//       msg: message,
//       success: false,
//     });
//   }

//   // Handle all other errors with a default message

//   return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
//     ...defaultErrorResponse,
//     msg: err.message || "An unexpected error occurred. Please try again later",
//   });
// };

// export default errorHandlerMiddleware;

import { StatusCodes } from "http-status-codes";
import { logger } from "../logger.js";
import { ValidationError } from "express-validation";
import mongoose from "mongoose";

const errorHandlerMiddleware = (err, req, res, next) => {
  logger.error(err?.message, { stack: err.stack });

  // Default error response
  let defaultErrorResponse = {
    message: "An unexpected error occurred. Please try again later.",
    success: false,
  };

  // Express-validation error
  if (err instanceof ValidationError) {
    const messages = err.details?.body
      ?.map((detail) => detail.message)
      .join(", ");
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: messages || "Validation error. Check your input.",
      success: false,
    });
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message || "Database validation error. Check your input.",
      success: false,
    });
  }

  // Mongoose cast error (e.g., invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: `Invalid ${err.path}: ${err.value}. Check your input.`,
      success: false,
    });
  }

  // Duplicate key error (MongoDB)
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue).join(", ");
    return res.status(StatusCodes.CONFLICT).json({
      message: `Duplicate value for field: ${duplicateField}. Provide a unique value.`,
      success: false,
    });
  }

  // Fallback for other errors
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    ...defaultErrorResponse,
    message: err.message || defaultErrorResponse.message,
  });
};

export default errorHandlerMiddleware;
