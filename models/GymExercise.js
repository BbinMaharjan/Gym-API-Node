const mongoose = require("mongoose");

const GymExerciseSchema = new mongoose.Schema({
  exerciseTitle: {
    type: String,
    required: false,
  },
  exerciseDescription: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
  gymOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  gymMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
});

const GymExercise = mongoose.model("GymExercise", GymExerciseSchema);

module.exports = GymExercise;
