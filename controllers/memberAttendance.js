const MemberAttendance = require("../models/MemberAttendance");

exports.getAllmemberAttendance = async (req, res) => {
  try {
    const result = await MemberAttendance.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All MemberAttendance", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addmemberAttendance = async (req, res) => {
  try {
    const { memberId, day, entryTime, exitTime } = req.body;

    const memberAttendance = new MemberAttendance({
      members: memberId,
      day,
      entryTime,
      exitTime,
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
