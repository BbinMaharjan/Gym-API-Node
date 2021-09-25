const MemberAttendance = require("../models/MemberAttendance");
const Member = require("../models/Member");

exports.getAllmemberAttendance = async (req, res) => {
  try {
    const result = await MemberAttendance.find()
      .sort({ createdAt: -1 })
      .populate("gymMember", "name email")
      .populate("gymOwner", "name gymTitle mobile");
    res.status(200).json({ message: "All MemberAttendance", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addmemberAttendance = async (req, res) => {
  try {
    gymOwnerId = req.gymOwner.id;
    const { memberId, day, entryTime, exitTime } = req.body;
    const memberAttendance = new MemberAttendance({
      gymMember: memberId,
      day,
      entryTime,
      exitTime,
      gymOwner: gymOwnerId,
    });
    await memberAttendance.save();
    res
      .status(200)
      .json({ Message: " Member Attendance Added", memberAttendance });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal error occurred", err });
  }
};
