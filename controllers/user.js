const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400).json({ error: "User does not exist" });
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
