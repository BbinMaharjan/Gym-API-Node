const express = require("express");
const router = express.Router();
const {
  getAllGymEquipment,
  addGymEquipment,
  updateGymEquipment,
  deleteGymEquipment,
  gymequipmentById,
} = require("../controllers/gymEquipment");
const { isGymOwner } = require("../middlewares/auth/gymOwner");

router.get("/", isGymOwner, getAllGymEquipment);

router.post("/addgymequipment", isGymOwner, addGymEquipment);

router.put("/gymequipment/:gymequipmentId", isGymOwner, updateGymEquipment);

router.delete("/gymequipment/:gymequipmentId", isGymOwner, deleteGymEquipment);

router.param("gymequipmentId", gymequipmentById);

module.exports = router;
