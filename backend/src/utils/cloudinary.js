/**
 * Cloudinary File Upload/Deletion Utilities
 */

import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { CloudinaryFileUploadError } from "../errors/index.js";
import { fileFormatBase64ForCloudinary } from "../lib/helper.js";

/**
 * Upload a single file to Cloudinary
 * @param {Object} file - Multer file object
 * @returns {Promise<Object>} - Cloudinary upload result with public_id and url
 */
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

/**
 * Upload multiple files to Cloudinary
 * @param {Array} files - Array of Multer file objects
 * @returns {Promise<Array>} - Array of Cloudinary upload results
 */
const uploadFilesToCloudinary = async (files = []) => {
  try {
    if (!files.length) {
      throw new CloudinaryFileUploadError("No files provided for upload.");
    }

    // Process uploads concurrently with Promise.all
    const results = await Promise.all(files.map(uploadFileToCloudinary));

    return results;
  } catch (error) {
    console.error("Cloudinary batch upload error:", error.message || error);
    throw new CloudinaryFileUploadError(
      error?.message ||
        "Failed to upload files to Cloudinary. Please try again later."
    );
  }
};

/**
 * Delete files from Cloudinary by public IDs
 * @param {Array<string>} public_ids - Array of Cloudinary public IDs to delete
 * @returns {Promise<Object>} - Cloudinary deletion result
 */
const deleteFilesFromCloudinary = async (public_ids) => {
  try {
    if (!public_ids || public_ids.length === 0) {
      return { result: "no files to delete" };
    }

    const result = await cloudinary.api.delete_resources(public_ids);
    return result;
  } catch (error) {
    console.error("Cloudinary deletion error:", error.message || error);
    throw new CloudinaryFileUploadError(
      error?.message || "Failed to delete files from Cloudinary."
    );
  }
};

export { uploadFilesToCloudinary, deleteFilesFromCloudinary };
