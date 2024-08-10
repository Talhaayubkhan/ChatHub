import CustomApiError from "./CustomError.js";
import { StatusCodes } from "http-status-codes";

class CloudinaryFileUploadError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export default CloudinaryFileUploadError;
