// CloudinaryFileUploadError.js
import CustomApiError from "./CustomError.js";
import { StatusCodes } from "http-status-codes";

class CloudinaryFileUploadError extends CustomApiError {
  constructor(
    message = "Error occurred while uploading the file to Cloudinary",
    metadata = {}
  ) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    this.metadata = metadata; // Optional field for additional context
    this.timestamp = new Date().toISOString(); // Add a timestamp for logging
  }
}

export default CloudinaryFileUploadError;
