const express = require("express");
const router = express.Router();
const {
  getAllGymEquipment,
  addGymEquipment,
} = require("../controllers/gymEquipment");

router.get("/", getAllGymEquipment);

router.post("/addgymequipment/:id", addGymEquipment);

module.exports = router;
