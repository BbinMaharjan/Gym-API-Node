const express = require("express");
const router = express.Router();
const { getAllTrainers, addTrainer } = require("../controllers/trainer");
const {
  registerTrainerValidator,
} = require("../middlewares/validators/trainer");

router.get("/", getAllTrainers);

router.post("/addTrainer", [...registerTrainerValidator], addTrainer);

module.exports = router;
