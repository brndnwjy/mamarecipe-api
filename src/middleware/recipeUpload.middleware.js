const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/recipe");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const maxSize = 2 * 1024 * 1024;

const recipeUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext == ".jpg" || ext == ".jpeg" || ext == ".png") {
      cb(null, true);
    } else {
      const error = {
        message: "filetype not supported",
      };
      cb(error, false);
    }
  },
  limits: {fileSize: maxSize}
});

module.exports = recipeUpload;
