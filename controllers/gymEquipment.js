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
    gymOwnerId = req.gymOwner.id;
    const { equipmentTitle, equipmentDescription, equipmentQuantity } =
      req.body;

    const Exists = await GymEquipment.findOne({
      equipmentTitle: equipmentTitle,
    });
    if (Exists) {
      return res.status(400).json({ error: "Equipment already exists" });
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

exports.updateGymEquipment = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Data can not be empty!" });
    }

    const result = await GymEquipment.findByIdAndUpdate(
      req.gymequipment._id,
      req.body,
      { useFindAndModify: false }
    );
    if (!result) {
      return res.status(400).send({ message: `GymEquipment not found` });
    } else {
      return res.send({ message: `GymEquipmentr data Updated successfully.` });
    }
  } catch (err) {
    res.status(500).send({ message: `Update Errorr` });
  }
};

// delete gymGymEquipment by id
exports.deleteGymEquipment = async (req, res) => {
  const gymeuipmentId = req.gymequipment._id;
  await GymEquipment.findByIdAndDelete(gymeuipmentId)
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: `GymEquipment not found!` });
      } else {
        return res.send({ message: `GymEquipment deleted successfully!` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal error occurred" });
    });
};
exports.gymequipmentById = async (req, res, next, id) => {
  const gymequipment = await GymEquipment.findById(id);
  if (!gymequipment) {
    return res.status(400).json({ error: "gymequipment Not Found" });
  }
  req.gymequipment = gymequipment;
  next();
};
