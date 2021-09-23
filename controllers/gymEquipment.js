const GymEquipment = require("../models/GymEquipment");

exports.getAllGymEquipment = async (req, res) => {
  try {
    const result = await GymEquipment.find().populate("gymOwner");
    res.status(200).json({ message: "All Equipments", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addGymEquipment = async (req, res) => {
  try {
    const {
      equipmentTitle,
      equipmentDescription,
      equipmentQuantity,
      gymOwnerId,
    } = req.body;

    const userExists = await GymEquipment.findOne({
      equipmentTitle: equipmentTitle,
    });
    if (userExists) {
      res.status(400).json({ error: "Equipment already exists" });
    }

    const gymEquipment = new GymEquipment({
      equipmentTitle,
      equipmentDescription,
      equipmentQuantity,
      gymOwnerId,
    });

    await gymEquipment.save();
    res.status(200).json({ message: "Equipment Added", gymEquipment });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};
