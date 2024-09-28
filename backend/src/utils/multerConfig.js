import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { BadRequest } from "../errors/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../../uploads/");
    if (!uploadPath) {
      throw new BadRequest("Failed to create upload directory.");
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multerUploadFile = multer({
  // storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new BadRequest("Please upload an image file (jpg, jpeg, png).")
      );
    }
    cb(null, true);
  },
});
// Single file upload (avatar)
const singleAavatar = multerUploadFile.single("avatar");

// Multiple files upload (attachments)
const multipleAttachmentsUpload = multerUploadFile.array("files", 10);

export { multerUploadFile, singleAavatar, multipleAttachmentsUpload };
