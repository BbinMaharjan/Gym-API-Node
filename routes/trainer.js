const express = require("express");
const router = express.Router();
const {
  getAllTrainers,
  addTrainer,
  updateGymTrainer,
  deleteGymTrainer,
  gymTrainerById,
} = require("../controllers/trainer");
const {
  registerTrainerValidator,
} = require("../middlewares/validators/trainer");

const { isGymOwner } = require("../middlewares/auth/gymOwner");

router.get("/", isGymOwner, getAllTrainers);

router.post(
  "/addTrainer",
  isGymOwner,
  [...registerTrainerValidator],
  addTrainer
);

router.put("/gymTrainer/:gymTrainerId", isGymOwner, updateGymTrainer);

router.delete("/gymTrainer/:gymTrainerId", isGymOwner, deleteGymTrainer);

router.param("gymTrainerId", gymTrainerById);

module.exports = router;
