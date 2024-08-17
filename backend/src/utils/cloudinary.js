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
    console.error("Cloudinary upload error:", error);
    throw new CloudinaryFileUploadError(
      "Failed to upload file to Cloudinary. Please ensure your file is in the correct format and try again later."
    );
  }
};

const uploadFilesToCloudinary = async (files = []) => {
  try {
    const results = await Promise.all(files.map(uploadFileToCloudinary));
    return results; // Results are already formatted
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new CloudinaryFileUploadError(
      "Failed to upload files to Cloudinary. Please try again later."
    );
  }
};

// const cloudinaryUpload = async (files = []) => {
//   const uploadPromise = files.map((file) => {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload(
//         file.path,
//         {
//           resource_type: "auto",
//           public_id: uuid(),
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );
//     });
//   });

//   try {
//     const result = await Promise.all(uploadPromise);
//     return result.map((res) => ({
//       public_id: res.public_id,
//       url: res.secure_url,
//     }));
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//   }
// };

// delete files from cloudinary!
const deleteFilesFromCloudinary = async (public_ids) => {};

export { uploadFilesToCloudinary, deleteFilesFromCloudinary };
