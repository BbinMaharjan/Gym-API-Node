const GymEquipment = require("../models/GymEquipment");

exports.getAllGymEquipment = async (req, res) => {
  try {
    const result = await GymEquipment.find().populate(
      "gymOwner",
      "name mobile"
    );
    res.status(200).json({ message: "All Equipments", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addGymEquipment = async (req, res) => {
  try {
    gymOwner = req.params;
    gymOwnerId = gymOwner.id;
    const { equipmentTitle, equipmentDescription, equipmentQuantity } =
      req.body;

    const Exists = await GymEquipment.findOne({
      equipmentTitle: equipmentTitle,
    });
    if (Exists) {
      res.status(400).json({ error: "Equipment already exists" });
    }

    const gymEquipment = new GymEquipment({
      equipmentTitle,
      equipmentDescription,
      equipmentQuantity,
      gymOwner: gymOwnerId,
    });
    await gymEquipment.save();
    res.status(200).json({ message: "Equipment Added", gymEquipment });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};
