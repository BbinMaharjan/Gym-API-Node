const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  gymOwner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Trainer = mongoose.model("Trainer", TrainerSchema);

module.exports = Trainer;
