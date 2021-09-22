const express = require("express");
const Member = require("../models/Member");
const router = express.Router();

const {
  getAllMember,
  addMember,
  updateMember,
  deleteMember,
} = require("../controllers/member");

const { registerMemberValidator } = require("../middlewares/validators/member");

router.get("/", getAllMember);

router.post("/addmember", [...registerMemberValidator], addMember);

// router.put("/:memberId", updateMember);

// router.delete("/:memberId", deleteMember);

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
