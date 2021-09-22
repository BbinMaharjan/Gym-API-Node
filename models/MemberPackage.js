const mongoose = require("mongoose");

const MemberPackageSchema = new mongoose.Schema({
  memberPackageType: {
    type: String,
    enum: ["Yearly", "Half Yearly", "Quarterly", "Monthly"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  gymOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const MemberPackage = mongoose.model("MemberPackage", MemberPackageSchema);

module.exports = MemberPackage;
