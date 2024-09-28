import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { CloudinaryFileUploadError } from "../errors/index.js";
import { fileFormatBase64ForCloudinary } from "../lib/helper.js";

const uploadFileToCloudinary = async (file) => {
  try {
    const base64Data = fileFormatBase64ForCloudinary(file);

    if (!base64Data) {
      throw new CloudinaryFileUploadError(
        "Unsupported file format. Please use a supported format like JPG, PNG, or GIF."
      );
    }

    const result = await cloudinary.uploader.upload(base64Data, {
      resource_type: "auto", // Automatically handles image, video, etc.
      public_id: uuid(),
    });

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error.message || error);
    throw new CloudinaryFileUploadError(
      error?.message ||
        "Failed to upload file to Cloudinary. Please ensure your file is in the correct format and try again later."
    );
  }
};

const uploadFilesToCloudinary = async (files = []) => {
  try {
    // File validation (optional)
    if (!files.length) {
      throw new CloudinaryFileUploadError("No files provided for upload.");
    }

    // Process uploads concurrently with Promise.all
    const results = await Promise.all(files.map(uploadFileToCloudinary));

    return results; // Results are already formatted
  } catch (error) {
    console.error("Cloudinary batch upload error:", error.message || error);
    throw new CloudinaryFileUploadError(
      error?.message ||
        "Failed to upload files to Cloudinary. Please try again later."
    );
  }
};

// delete files from cloudinary!
const deleteFilesFromCloudinary = async (public_ids) => {};

export { uploadFilesToCloudinary, deleteFilesFromCloudinary };
