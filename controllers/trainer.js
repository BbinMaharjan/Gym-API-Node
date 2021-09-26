const Trainer = require("../models/Trainer");

const { validationResult } = require("express-validator");

exports.getAllTrainers = async (req, res) => {
  try {
    const result = await Trainer.find()
      .sort({ createdAt: -1 })
      .populate("gymOwner", "name mobile");
    res.status(200).json({ message: "All Trainers", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addTrainer = async (req, res) => {
  try {
    gymOwnerId = req.gymOwner.id;
    const { name, email, address, mobile, experience, salary } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const TrainerExists = await Trainer.findOne({ mobile: mobile });

    if (TrainerExists) {
      return res.status(400).json({ error: "Trainer already exists" });
    }

    const trainer = new Trainer({
      name,
      email,
      address,
      mobile,
      experience,
      salary,
      gymOwner: gymOwnerId,
    });

    await trainer.save();
    res.status(200).json({ Message: " Trainer Added", trainer });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.updateGymTrainer = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Data can not be empty!" });
    }

    const result = await Trainer.findByIdAndUpdate(
      req.gymTrainer._id,
      req.body,
      { useFindAndModify: false }
    );
    if (!result) {
      return res.status(400).send({ message: `GymTrainer not found` });
    } else {
      return res.send({ message: `GymTrainerr data Updated successfully.` });
    }
  } catch (err) {
    res.status(500).send({ message: `Update Errorr` });
  }
};

exports.deleteGymTrainer = async (req, res) => {
  const gymTrainerId = req.gymTrainer._id;
  await Trainer.findByIdAndDelete(gymTrainerId)
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: `GymTrainer not found!` });
      } else {
        return res.send({ message: `GymTrainer deleted successfully!` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal error occurred" });
    });
};
exports.gymTrainerById = async (req, res, next, id) => {
  const gymTrainer = await Trainer.findById(id);
  if (!gymTrainer) {
    return res.status(400).json({ error: "GymTrainer Not Found" });
  }
  req.gymTrainer = gymTrainer;
  next();
};
