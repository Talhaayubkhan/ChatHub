import CustomApiError from "./CustomError.js";
import { StatusCodes } from "http-status-codes";

class Unauthorized extends CustomApiError {
  constructor(
    message = "You do not have permission to access this resource",
    errorCode = "Unauthorized Error",
    metadata = {}
  ) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
    this.errorCode = errorCode;
    this.metadata = metadata;
    this.timestamp = new Date().toISOString();
  }
}

export default Unauthorized;
