const Member = require("../models/Member");
const GymExercise = require("../models/GymExercise");
const Payment = require("../models/Payment");
const ObjectId = require("mongodb").ObjectId;
const MemberWorkoutPlan = require("../models/MemberWorkoutPlan");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.loginMember = async (req, res) => {
  try {
    const { name, membershipNo } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const member = await Member.findOne({ name: name });

    if (!member) {
      return res.status(400).json({ error: "Member Name does not exist" });
    }
    if (member.membershipNo != membershipNo) {
      return res
        .status(400)
        .json({ error: "Member MemberShip Number does not exist" });
    }

    const payload = {
      _id: member._id,
      name: member.name,
      membershipNo: member.membershipNo,
      email: member.email,
    };

    const token = jwt.sign(payload, "myhiddensecret", { expiresIn: "24h" });

    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ error: "Internal error occurred", e });
  }
};

exports.getMemberProfile = async (req, res) => {
  try {
    gymMember = req.member.membershipNo;
    const result = await Member.findOne({ membershipNo: gymMember }).select(
      "membershipNo name email address gender dob mobile "
    );
    res.status(200).json({ message: "Member Profile", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.getPayment = async (req, res) => {
  try {
    memberId = req.member._id;
    console.log(memberId);
    const result = await Payment.find({
      gymMember: ObjectId(memberId),
    })
      .populate("gymMember", "membershipNO name mobile ")
      .populate("gymOwner", "name")
      .select("gymMember paymentType paymentMonth paidAmount gymOwner");

    res.status(200).json({ message: "Payment By Member Id ", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.getGymExercise = async (req, res) => {
  try {
    const result = await GymExercise.find();
    res.status(200).json({ message: "Gym Exercses", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};
exports.getMemberWorkoutPlan = async (req, res) => {
  try {
    memberId = req.member._id;
    const result = await MemberWorkoutPlan.find({
      gymMember: ObjectId(memberId),
    })
      .sort({ createdAt: -1 })
      .populate("gymMember", "name ")
      .populate("gymExercise", "exerciseTitle exerciseDescription");
    res.status(200).json({ message: "All Member Workout Plan", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};
exports.addMemberWorkoutPlan = async (req, res) => {
  try {
    gymMemberId = req.member._id;
    const { planTitle, exerciseDay, gymExerciseIds } = req.body;

    const memberWorkoutPlan = new MemberWorkoutPlan({
      gymMember: gymMemberId,
      planTitle,
      exerciseDay,
      gymExercise: gymExerciseIds,
    });

    //console.log(memberWorkoutPlan);
    await memberWorkoutPlan.save();

    res.status(200).json({ message: "Save ", memberWorkoutPlan });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.updateMemberWorkoutPlan = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Data can not be empty!" });
    }

    const result = await MemberWorkoutPlan.findByIdAndUpdate(
      req.memberWorkoutPlan._id,
      req.body,
      { useFindAndModify: false }
    );
    if (!result) {
      return res.status(400).send({ message: `MemberWorkoutPlan not found` });
    } else {
      return res.send({
        message: `MemberWorkoutPlanr data Updated successfully.`,
      });
    }
  } catch (err) {
    res.status(500).send({ message: `Update Errorr` });
  }
};

exports.deleteMemberWorkoutPlan = async (req, res) => {
  const memberWorkoutPlanId = req.memberWorkoutPlan._id;
  await MemberWorkoutPlan.findByIdAndDelete(memberWorkoutPlanId)
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: `MemberWorkPlan not found!` });
      } else {
        return res.send({ message: `MemberWorkPlan deleted successfully!` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal error occurred" });
    });
};

exports.memberWorkoutPlanById = async (req, res, next, id) => {
  const memberWorkoutPlan = await MemberWorkoutPlan.findById(id);
  if (!memberWorkoutPlan) {
    return res.status(400).json({ error: "MemberWorkoutPlan Not Found" });
  }
  req.memberWorkoutPlan = memberWorkoutPlan;
  next();
};
