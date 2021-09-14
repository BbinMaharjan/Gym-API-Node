const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  membershipNo: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  dob: {
    type: Date,
    required: true,
  },
  mobile: {
    type: Number,
    trim: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Member = mongoose.model("Member", MemberSchema);
module.exports = Member;
