import { multer, MulterError } from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const ACCEPTED_FILES = ["image/png", "image/jpg", "image/jpeg"];

const MAXIMUM_IMAGE_SIZE = 1024 * 1024 * 2;

// Generate a unique filename
const generateFilename = (file) => {
  const hashFilename =
    crypto.createHash("md5").update(file.fieldname).digest("hex") +
    path.extname(file.originalname);
  return `${new Date().valueOf()}${hashFilename}`;
};

const storageInstance = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirname = path.resolve("./");
    const dirFull = path.join(dirname, "uploads");

    fs.mkdir(dirFull, (err) => {
      cb(null, dirFull);
    });
  },
  filename: (req, file, cb) => {
    const uniqueFilename = generateFilename(file);
    cb(null, uniqueFilename);
  },
});

const fileFilterFn = (req, file, cb) => {
  const fileType = file.mimetype;
  const isValidFile = ACCEPTED_FILES.includes(fileType);

  if (isValidFile) {
    cb(null, true);
  } else {
    cb(new MulterError("UNSUPPORTED_FILE", "un-supported file"), false);
  }
};

const imageUploadService = multer({
  storage: storageInstance,
  fileFilter: fileFilterFn,
  limits: {
    fileSize: MAXIMUM_IMAGE_SIZE,
  },
});

export default imageUploadService;
