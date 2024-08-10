import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multerUploadFile = multer({
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
const multipleFilesUpload = multerUploadFile.array("files", 10);

export { multerUploadFile, singleAavatar, multipleFilesUpload };
