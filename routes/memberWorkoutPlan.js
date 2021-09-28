const express = require("express");
const {
  getAllMemberWorkoutPlan,
  addMemberWorkoutPlan,
} = require("../controllers/memberWorkoutPlan");

const router = express.Router();

router.get("/", getAllMemberWorkoutPlan);

router.post("/addMemberWorkoutPlan", addMemberWorkoutPlan);

module.exports = router;
