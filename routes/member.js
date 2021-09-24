const express = require("express");
const Member = require("../models/Member");
const router = express.Router();

const {
  getAllMember,
  addMember,
  updateMember,
  deleteMember,
} = require("../controllers/member");

const { isGymOwner } = require("../middlewares/auth/gymOwner");

const { registerMemberValidator } = require("../middlewares/validators/member");

router.get("/", isGymOwner, getAllMember);

router.post("/addmember", isGymOwner, [...registerMemberValidator], addMember);

router.put("/gymmembers/:memberId", isGymOwner, updateMember);

router.delete("/gymmembers/:memberId", isGymOwner, deleteMember);

router.param("memberId", async (req, res, next, id) => {
  const member = await Member.findById(id);
  if (!member) {
    return res.status(400).json({
      error: "Member Not Found",
    });
  }
  req.memberprofile = member;
  next();
});

module.exports = router;
