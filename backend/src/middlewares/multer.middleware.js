import multer from "multer";

const multerUploadFile = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const singleAavatar = multerUploadFile.single("avatar");

export { multerUploadFile, singleAavatar };
