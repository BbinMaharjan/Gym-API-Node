const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    membershipNo: {
      type: Number,
      trim: true,
      maxlenght: 999999,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      maxlenght: 32,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      maxlenght: 32,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      maxlenght: 100,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    mobile: {
      type: Number,
      trim: true,
      maxlenght: 10,
      required: true,
    },
    joinDate: {
      type: Date,
      required: true,
    },
    sift: {
      type: String,
      enum: ["morning", "evening"],
    },
    image: {
      type: String,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: false,
    },
    memberAttendance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MemberAttendance",
      required: false,
    },
    memberPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MemberPackage",
      required: false,
    },
    gymExercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GymExercise",
      required: false,
    },
    memberWorkoutPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MemberWorkoutPlan",
      required: false,
    },
    gymOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", MemberSchema);
module.exports = Member;
