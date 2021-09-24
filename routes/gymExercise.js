const express = require("express");
const router = express.Router();
const {
  getAllgymExercise,
  addgymExercise,
} = require("../controllers/gymExercise");

router.get("/", getAllgymExercise);

router.post("/addgymExercise", addgymExercise);

module.exports = router;
