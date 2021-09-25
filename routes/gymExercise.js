const express = require("express");
const router = express.Router();
const {
  getAllgymExercise,
  addgymExercise,
  updategymExercise,
  deletegymExercise,
  gymExerciseById,
} = require("../controllers/gymExercise");
const { isGymOwner } = require("../middlewares/auth/gymOwner");

router.get("/", isGymOwner, getAllgymExercise);

router.post("/addgymExercise", isGymOwner, addgymExercise);

router.put("/gymExercise/:gymExerciseId", isGymOwner, updategymExercise);

router.delete("/gymExercise/:gymExerciseId", isGymOwner, deletegymExercise);

router.param("gymExerciseId", gymExerciseById);

module.exports = router;
