const mongoose = require("mongoose");

const MemberAttendanceSchema = new mongoose.Schema(
  {
    gymMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      require: true,
    },
    day: {
      type: String,
      enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    entryTime: {
      type: String,
      required: true,
    },
    exitTime: {
      type: String,
      required: true,
    },
    gymOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const MemberAttendance = mongoose.model(
  "MemberAttendance",
  MemberAttendanceSchema
);

module.exports = MemberAttendance;
