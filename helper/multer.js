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

const adminImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/admin");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const gymOwnerImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/gymowner");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports.uploadAdminImage = multer({
  storage: adminImage,
}).single("image");

module.exports.uploadGymExerciseImage = multer({
  storage: gymExerciseImage,
}).single("image");

module.exports.uploadGymOwnerImage = multer({
  storage: gymOwnerImage,
}).single("image");
