import CustomApiError from "./CustomError.js";
import { StatusCodes } from "http-status-codes";

class BadRequest extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.message = "Bad request...";
  }
}

export default BadRequest;
