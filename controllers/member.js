const Member = require("../models/Member");
const { validationResult } = require("express-validator");
// add New gym member
exports.addMember = async (req, res) => {
  try {
    gymOwnerId = req.gymOwner.id;
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
      gymOwner: gymOwnerId,
    });
    await member.save();
    res.status(200).json({ message: "Member Added", member });
  } catch (err) {
    res.status(500).json({ error: "Internal Error occurred" });
  }
};

// Get All Gym Members
exports.getAllMember = async (req, res) => {
  try {
    const result = await Member.find()
      .sort({ createdAt: -1 })
      .populate("gymOwner", "name gymTitle gymLocation mobile");
    res.status(200).json({ Member: result });
  } catch {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

// update gym member by member id
exports.updateMember = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Data can not be empty!" });
    }

    const result = await Member.findByIdAndUpdate(
      req.memberprofile._id,
      req.body,
      { useFindAndModify: false }
    );
    if (!result) {
      return res.status(400).send({ message: `Member not found` });
    } else {
      return res.send({ message: `Member data Updated successfully.` });
    }
  } catch (err) {
    res.status(500).send({ message: `Update Errorr` });
  }
};

// delete gymmember by id
exports.deleteMember = async (req, res) => {
  const memberid = req.memberprofile._id;
  await Member.findByIdAndDelete(memberid)
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: `Member was not found!` });
      } else {
        return res.send({ message: `Member deleted successfully!` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal error occurred" });
    });
};

exports.memberById = async (req, res, next, id) => {
  const member = await Member.findById(id);
  if (!member) {
    return res.status(400).json({
      error: "Member Not Found",
    });
  }
  req.memberprofile = member;
  next();
};
