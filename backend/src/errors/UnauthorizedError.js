import CustomApiError from "./CustomError.js";
import { StatusCodes } from "http-status-codes";

class Unauthorized extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
    this.message = "Unauthorized access denied!";
  }
}

export default Unauthorized;
