const mongoose = require("mongoose");

const MemberAttendanceSchema = new mongoose.Schema(
  {
    member: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
      },
    ],
    day: {
      type: String,
      enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    entryTime: {
      type: TimeRanges,
      required: true,
    },
    exitTime: {
      type: TimeRanges,
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
