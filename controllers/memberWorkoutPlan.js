const MemberWorkoutPlan = require("../models/MemberWorkoutPlan");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.getAllMemberWorkoutPlan = async (req, res) => {
  try {
    const result = await MemberWorkoutPlan.find()
      .sort({ createdAt: -1 })
      .populate("gymMember", "name ")
      .populate("gymExercise","exerciseTitle exerciseDescription");
    res.status(200).json({ message: "All Member Workout Plan", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addMemberWorkoutPlan = async (req, res) => {
  try {
    const { gymMemberId, planTitle, exerciseDay, gymExerciseIds } = req.body;

    const memberWorkoutPlan = new MemberWorkoutPlan({
      gymMember: gymMemberId,
      planTitle,
      exerciseDay,
      gymExercise: gymExerciseIds,
    });

    console.log(memberWorkoutPlan);
    await memberWorkoutPlan.save();

    res.status(200).json({ message: "Save ", memberWorkoutPlan });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};
