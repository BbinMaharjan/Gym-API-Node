const Trainer = require("../models/Trainer");

const { validationResult } = require("express-validator");

exports.getAllTrainers = async (req, res) => {
  try {
    const result = await Trainer.find()
      .sort({ createdAt: -1 })
    res.status(200).json({ message: "All Trainers", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addTrainer = async (req, res) => {
  try {
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
    });

    await trainer.save();
    res.status(200).json({ Message: " Trainer Added", trainer });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};
