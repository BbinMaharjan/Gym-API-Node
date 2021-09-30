const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// create users
exports.registerGymOwner = async (req, res) => {
  try {
    const { name, email, password, mobile, gymTitle, gymLocation } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const gymOwnerExists = await User.findOne({ email: email });

    if (gymOwnerExists) {
      return res.status(400).json({ error: "Gym Owner already exists" });
    }

    const { filename: image } = req.file;
    req.body.image = image;

    const gymOwner = new User({
      name,
      email,
      password,
      mobile,
      gymTitle,
      gymLocation,
      image,
    });
    await gymOwner.save();
    res.status(200).json({ message: "Gym Owner register", gymOwner });
  } catch (e) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.loginGymOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({ error: "Password did not match" });
    }

    const payload = {
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    };

    const token = jwt.sign(payload, "myhiddensecret", { expiresIn: "24h" });

    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.getGymOwnerProfile = async (req, res) => {
  try {
    gymOwner = req.gymOwner.email;
    const result = await User.findOne({ email: gymOwner }).select(
      "name email role mobile"
    );
    res.status(200).json({ message: "Admin Profile", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};
