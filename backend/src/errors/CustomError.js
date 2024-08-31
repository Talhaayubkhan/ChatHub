import { StatusCodes } from "http-status-codes";

class CustomApiError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    this.message = message || "An unexpected error occurred";
  }
}

export default CustomApiError;
