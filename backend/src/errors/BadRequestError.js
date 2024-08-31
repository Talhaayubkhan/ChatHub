import CustomApiError from "./CustomError.js";
import { StatusCodes } from "http-status-codes";

class BadRequest extends CustomApiError {
  constructor(message = "Bad request. Please check your input") {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
