const mongoose = require("mongoose");

const MemberAttendanceSchema = new mongoose.Schema(
  {
    members: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      require: false,
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
  },
  { timestamps: true }
);

const MemberAttendance = mongoose.model(
  "MemberAttendance",
  MemberAttendanceSchema
);

module.exports = MemberAttendance;
