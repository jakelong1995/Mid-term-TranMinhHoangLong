import { MulterError } from "multer";
import imageUploadService from "../helpers/uploadImage.js";

const imageUploadLocal = (req, res, next) => {
  // Will be returned a multer middleware
  const uploader = imageUploadService.single("image");

  // req.file
  uploader(req, res, (err) => {
    if (err instanceof MulterError) {
      return res.status(400).json({
        msg: err.message,
      });
    } else if (err) {
      return res.status(500).json({
        msg: err.message,
      });
    } else {
      next();
    }
  });
};

const imagesUploadLocal = (req, res, next) => {
  // Will be returned a multer middleware
  const uploader = imageUploadService.array("photos");

  uploader(req, res, (err) => {
    if (err instanceof MulterError) {
      return res.status(400).json({
        msg: err.message,
      });
    } else if (err) {
      return res.status(500).json({
        msg: err.message,
      });
    } else {
      next();
    }
  });
};

export { imageUploadLocal, imagesUploadLocal };
