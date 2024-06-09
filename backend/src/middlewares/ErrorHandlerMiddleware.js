import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "../errors/index.js";
import { ValidationError } from "express-validation";
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.error(err);

  if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json({ msg: err?.message || "Validation Error Occur, try again!" });
  }

  if (err instanceof CustomApiError) {
    return res
      .status(err.statusCode || StatusCodes.BAD_REQUEST)
      .json({ msg: err.message || "Error Occur, try again!" });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || "Internal Server Error",
    success: false,
  });
};

export default errorHandlerMiddleware;
