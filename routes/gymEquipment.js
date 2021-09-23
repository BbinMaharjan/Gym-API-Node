const express = require("express");
const router = express.Router();
const {
  getAllGymEquipment,
  addGymEquipment,
} = require("../controllers/gymEquipment");

router.get("/", getAllGymEquipment);

router.post("/addgymequipment", addGymEquipment);

module.exports = router;
