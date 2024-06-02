import CustomApiError from "./CustomError.js";
import { StatusCodes } from "http-status-codes";

class NotFound extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.message = "Resource not found!";
  }
}

export default NotFound;
