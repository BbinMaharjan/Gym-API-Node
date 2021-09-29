const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      maxlength: 100,
      required: true,
    },
    mobile: {
      type: Number,
      trim: true,
      maxlength: 10,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    gymOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Trainer = mongoose.model("Trainer", TrainerSchema);

module.exports = Trainer;
