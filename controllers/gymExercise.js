const GymExercise = require("../models/GymExercise");

exports.getAllgymExercise = async (req, res) => {
  try {
    const result = await GymExercise.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All GymExercise", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addgymExercise = async (req, res) => {
  try {
    const { exerciseTitle, exerciseDescription, exercisePhoto } = req.body;

    const gymExercise = new GymExercise({
      exerciseTitle,
      exerciseDescription,
      exercisePhoto,
    });

    await gymExercise.save();
    res.status(200).json({ Message: " Gym Exercise Added", gymExercise });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};
