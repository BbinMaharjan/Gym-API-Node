const mongoose = require("mongoose");

const GymEquipmentSchema = new mongoose.Schema(
  {
    equipmentTitle: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    equipmentDescription: {
      type: String,
      trim: true,
      required: false,
      maxlength: 1000,
    },
    equipmentQuantity: {
      type: Number,
      maxlength: 1000,
      required: true,
    },
    gymOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const GymEquipment = mongoose.model("GymEquipment", GymEquipmentSchema);

module.exports = GymEquipment;
