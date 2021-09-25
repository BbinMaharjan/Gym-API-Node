const express = require("express");
const router = express.Router();

const {
  getAllMember,
  addMember,
  updateMember,
  deleteMember,
  memberById,
} = require("../controllers/member");

const { isGymOwner } = require("../middlewares/auth/gymOwner");

const { registerMemberValidator } = require("../middlewares/validators/member");

router.get("/", isGymOwner, getAllMember);

router.post("/addmember", isGymOwner, [...registerMemberValidator], addMember);

router.put("/gymmembers/:memberId", isGymOwner, updateMember);

router.delete("/gymmembers/:memberId", isGymOwner, deleteMember);

router.param("memberId", memberById);

module.exports = router;
