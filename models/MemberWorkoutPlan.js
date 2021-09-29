const mongoose = require("mongoose");

const MemberWorkoutPlanSchema = new mongoose.Schema(
  {
    gymMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    planTitle: {
      type: String,
      trim: true,
      maxlength: 100,
      required: true,
    },
    exerciseDay: {
      type: String,
      emu: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    gymExercise: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "gymExercise",
      },
    ],
  },
  { timestamps: true }
);

const MemberWorkoutPlan = mongoose.model(
  "MemberWorkoutPlan",
  MemberWorkoutPlanSchema
);

module.exports = MemberWorkoutPlan;
