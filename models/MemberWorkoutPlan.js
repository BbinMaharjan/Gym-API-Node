const mongoose = require("mongoose");

const MemberWorkoutPlanSchema = new mongoose.Schema({
  planTitle: {
    type: String,
    required: true,
  },
  exerciseDay: {
    type: String,
    emu: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  gymExercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gymExercise",
  },
});

const MemberWorkoutPlan = mongoose.model(
  "MemberWorkoutPlan",
  MemberWorkoutPlanSchema
);

module.exports = MemberWorkoutPlan;
