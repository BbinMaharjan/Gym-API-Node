const express = require("express");

const router = express.Router();

const {
  loginMember,
  getMemberProfile,
  getGymExercise,
  getPayment,
  getMemberWorkoutPlan,
  addMemberWorkoutPlan,
  updateMemberWorkoutPlan,
  deleteMemberWorkoutPlan,
  memberWorkoutPlanById,
} = require("../controllers/memberDashboard");
const { loginMemberValidator } = require("../middlewares/validators/member");
const { isMember } = require("../middlewares/auth/gymMember");

router.post("/login", [...loginMemberValidator], loginMember);
router.get("/memberprofile", isMember, getMemberProfile);
router.get("/payments", isMember, getPayment);
router.get("/gymexercises", isMember, getGymExercise);
router.get("/memberworkoutplan", isMember, getMemberWorkoutPlan);
router.post("/addmemberworkoutplan", isMember, addMemberWorkoutPlan);
router.put(
  "/memberworkoutplan/:memberworkoutplanId",
  isMember,
  updateMemberWorkoutPlan
);
router.delete(
  "/memberworkoutplan/:memberworkoutplanId",
  isMember,
  deleteMemberWorkoutPlan
);
router.param("memberworkoutplanId", memberWorkoutPlanById);
module.exports = router;
