const GymExercise = require("../models/GymExercise");

exports.getAllgymExercise = async (req, res) => {
  try {
    const result = await GymExercise.find()
      .sort({ createdAt: -1 })
      .populate("gymOwner", "name gymTitle gymLocation mobile");
    res.status(200).json({ message: "All GymExercise", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addgymExercise = async (req, res) => {
  try {
    gymOwnerId = req.gymOwner.id;
    const { exerciseTitle, exerciseDescription, exercisePhoto } = req.body;

    const gymExercise = new GymExercise({
      exerciseTitle,
      exerciseDescription,
      exercisePhoto,
      gymOwner: gymOwnerId,
    });

    await gymExercise.save();
    res.status(200).json({ Message: " Gym Exercise Added", gymExercise });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.updategymExercise = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Data can not be empty!" });
    }

    const result = await GymExercise.findByIdAndUpdate(
      req.gymExercise._id,
      req.body,
      { useFindAndModify: false }
    );
    if (!result) {
      return res.status(400).send({ message: `gymExercise not found` });
    } else {
      return res.send({ message: `gymExerciser data Updated successfully.` });
    }
  } catch (err) {
    res.status(500).send({ message: `Update Errorr` });
  }
};

exports.deletegymExercise = async (req, res) => {
  const gymExerciseId = req.gymExercise._id;
  await GymExercise.findByIdAndDelete(gymExerciseId)
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: `GymExercise not found!` });
      } else {
        return res.send({ message: `GymExercise deleted successfully!` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal error occurred" });
    });
};

exports.gymExerciseById = async (req, res, next, id) => {
  const gymExercise = await GymExercise.findById(id);
  if (!gymExercise) {
    return res.status(400).json({
      error: "GymExercise Not Found",
    });
  }
  req.gymExercise = gymExercise;
  next();
};
