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
      const { name, email, address, gender, password, phoneNumber } = req.body;
  
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
        address,
        gender,
        password,
        phoneNumber,
      });
      await user.save();
      res.status(200).json({ success: user });
    } catch (e) {
      res.status(500).json({ error: "Internal error occurred" });
    }
  };