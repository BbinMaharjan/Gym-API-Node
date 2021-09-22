const mongoose = require("mongoose");

const MemberScanSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      emu: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    member: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const MemberScan = mongoose.model("MemberScan", MemberScanSchema);

module.exports = MemberScan;
