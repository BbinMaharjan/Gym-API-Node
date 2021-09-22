const Member = require("../models/Member");
const { validationResult } = require("express-validator");

exports.addMember = async (req, res) => {
  try {
    const {
      membershipNo,
      name,
      email,
      address,
      gender,
      dob,
      mobile,
      joinDate,
      sift,
      image,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const memberExists = await Member.findOne({ membershipNo: membershipNo });

    if (memberExists) {
      return res.status(400).json({ error: "Member already exists" });
    }

    const member = new Member({
      membershipNo,
      name,
      email,
      address,
      gender,
      dob,
      mobile,
      joinDate,
      sift,
      image,
    });
    await member.save();
    res.status(200).json({ message: "Member Added", member });
  } catch (err) {
    res.status(500).json({ error: "Internal Error occurred" });
  }
};

exports.getAllMember = async (req, res) => {
  try {
    const result = await Member.find().sort({ createdAt: -1 });
    res.status(200).json({ Member: result });
  } catch {
    res.status(500).json({ error: "Internal error occurred" });
  }
};
