const mongoose = require("mongoose");

const GymExerciseSchema = new mongoose.Schema(
  {
    exerciseTitle: {
      type: String,
      trim: true,
      maxlenght: 100,
      required: true,
    },
    exerciseDescription: {
      type: String,
      trim: true,
      maxlenght: 1000,
      required: true,
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
  },
  { timestamps: true }
);

const GymExercise = mongoose.model("GymExercise", GymExerciseSchema);

module.exports = GymExercise;
