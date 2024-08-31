import CustomApiError from "./CustomError.js";
import { StatusCodes } from "http-status-codes";
class Unauthenticated extends CustomApiError {
  constructor(message = "Unauthenticated") {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default Unauthenticated;
