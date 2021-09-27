const path = require("path");
const multer = require("multer");

const gymExerciseImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/gymexercise");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports.uploadGymExerciseImage = multer({
  storage: gymExerciseImage,
}).single("image");
