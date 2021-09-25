const mongoose = require("mongoose");

const GymExerciseSchema = new mongoose.Schema({
  exerciseTitle: {
    type: String,
    required: true,
  },
  exerciseDescription: {
    type: String,
    required: true,
  },
  exercisePhoto: {
    type: String,
  },
  gymOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const GymExercise = mongoose.model("GymExercise", GymExerciseSchema);

module.exports = GymExercise;
