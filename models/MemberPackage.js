const mongoose = require("mongoose");

const MemberPackageSchema = new mongoose.Schema(
  {
    memberPackageType: {
      type: String,
      enum: ["Yearly", "Half Yearly", "Quarterly", "Monthly"],
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      maxlength: 10,
      required: true,
    },
    gymOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const MemberPackage = mongoose.model("MemberPackage", MemberPackageSchema);

module.exports = MemberPackage;
