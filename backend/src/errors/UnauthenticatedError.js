import CustomApiError from "./CustomError.js";
import { StatusCodes } from "http-status-codes";
class Unauthenticated extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.message = message || "Unauthenticated Error!";
  }
}

export default Unauthenticated;
