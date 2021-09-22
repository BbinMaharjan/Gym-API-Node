const User = require("../models/User");
const { validationResult } = require("express-validator");

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const result = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

// create users
exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      role,
      gymTitle,
      gymLocation,
      image,
      isVerified,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400).json({ error: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
      mobile,
      role,
      gymTitle,
      gymLocation,
      image,
      isVerified,
    });
    await user.save();
    res.status(200).json({ success: user });
  } catch (e) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.userById = async (req, res, next, id) => {
  const user = await User.findById(id);
  if (user) {
    user.salt = undefined;
    user.hashed_password = undefined;
    req.userprofile = user;
    next();
  } else {
    res.status(400).json({ error: "User not found!" });
  }
};

exports.read = (req, res) => {
  return res.json(req.userprofile);
};
