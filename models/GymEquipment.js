const mongoose = require("mongoose");

const GymEquipmentSchema = new mongoose.Schema({
  equipmentTitle: {
    type: String,
    required: true,
  },
  equipmentDescription: {
    type: String,
    required: false,
  },
  equipmentQuantity: {
    type: Number,
    required: true,
  },
  gymOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
});

const GymEquipment = mongoose.model("GymEquipment", GymEquipmentSchema);

module.exports = GymEquipment;
