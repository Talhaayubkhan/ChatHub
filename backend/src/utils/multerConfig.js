/**
 * Multer Configuration for File Uploads
 * Handles single avatar and multiple attachment uploads
 */

import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { BadRequest } from "../errors/index.js";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../../uploads/");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multerUploadFile = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(
        new BadRequest("Please upload an image file (jpg, jpeg, png, gif).")
      );
    }
    cb(null, true);
  },
});

// Single file upload (avatar)
const singleAavatar = multerUploadFile.single("avatar");

// Multiple files upload (attachments) - max 10 files
const multipleAttachmentsUpload = multerUploadFile.array("files", 10);

export { multerUploadFile, singleAavatar, multipleAttachmentsUpload };
