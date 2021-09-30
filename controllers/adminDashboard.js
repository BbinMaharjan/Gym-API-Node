const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.addAdmin = async (req, res) => {
  try {
    const { name, email, password, mobile, role } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const adminExists = await User.findOne({ email: email });

    if (adminExists) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const { filename: image } = req.file;
    req.body.image = image;

    const admin = new User({
      name,
      email,
      password,
      mobile,
      image,
      role,
    });
    await admin.save();
    res.status(200).json({ message: "Admin Created", admin });
  } catch (e) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const admin = await User.findOne({ email: email });

    if (!admin) {
      return res.status(400).json({ error: "Admin does not exist" });
    }

    if (!admin.authenticate(password)) {
      return res.status(400).json({ error: "Password did not match" });
    }

    const payload = {
      _id: admin._id,
      name: admin.name,
      role: admin.role,
      email: admin.email,
    };

    const token = jwt.sign(payload, "myhiddensecret", { expiresIn: "24h" });

    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    admin = req.admin.email;
    const result = await User.findOne({ email: admin }).select(
      "name email role mobile"
    );
    res.status(200).json({ message: "Admin Profile", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.getGymOwner = async (req, res) => {
  try {
    const gymOwner = "GymOwner";
    const result = await User.find({ role: gymOwner }).sort({ createdAt: -1 });
    res.status(200).json({ messeng: "All Gym Owner", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.updateGymOwner = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Data can not be empty!" });
    }

    const result = await User.findByIdAndUpdate(req.gymOwner._id, req.body, {
      useFindAndModify: false,
    });
    if (!result) {
      return res.status(400).send({ message: `GymOwner not found` });
    } else {
      return res.send({
        message: `GymOwnerr data Updated successfully.`,
      });
    }
  } catch (err) {
    res.status(500).send({ message: `Update Errorr` });
  }
};

exports.deleteGymOwner = async (req, res) => {
  const gymOwnerId = req.gymOwner._id;
  await User.findByIdAndDelete(gymOwnerId)
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: `Gym Owner not found!` });
      } else {
        return res.send({ message: `Gym Owner deleted successfully!` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal error occurred" });
    });
};
exports.gymOwnerById = async (req, res, next, id) => {
  const gymOwner = await User.findById(id);
  if (!gymOwner) {
    return res.status(400).json({ error: "GymOwner Not Found" });
  }
  req.gymOwner = gymOwner;
  next();
};
