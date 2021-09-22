const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    memberPackage: {
      type: mongoose.Schema.Types.objectId,
      ref: "MemberPackage",
    },
    gymExercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GymExercise",
    },
    memberWorkoutPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MemberWorkoutPlan",
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