const { Mongoose } = require("mongoose");
const Payment = require("../models/Payment");
const ObjectId = require("mongodb").ObjectId;

exports.getAllMemberPayment = async (req, res) => {
  try {
    const result = await Payment.find()
      .sort({ createdAt: -1 })
      .populate("gymMember", "membershipNo name email")
      .populate("gymOwner", "name mobile");
    res.status(200).json({ message: "All MemberPayment", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addMemberPayment = async (req, res) => {
  try {
    gymOwnerId = req.gymOwner.id;
    const { memberId, paymentType, paymentMonth, paidAmount } = req.body;

    const memberPayment = new Payment({
      gymMember: memberId,
      paymentType,
      paymentMonth,
      paidAmount,
      gymOwner: gymOwnerId,
    });

    await memberPayment.save();
    res.status(200).json({ Message: " Member Payment Added", memberPayment });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.updateMemberPayment = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Data can not be empty!" });
    }

    const result = await Payment.findByIdAndUpdate(
      req.memberPayment._id,
      req.body,
      { useFindAndModify: false }
    );
    if (!result) {
      return res.status(400).send({ message: `MemberPayment not found` });
    } else {
      return res.send({ message: `MemberPayment data Updated successfully.` });
    }
  } catch (err) {
    res.status(500).send({ message: `Update Errorr` });
  }
};

exports.deleteMemberPayment = async (req, res) => {
  const memberPaymentId = req.memberPayment._id;
  await Payment.findByIdAndDelete(memberPaymentId)
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: `MemberPayment not found!` });
      } else {
        return res.send({ message: `MemberPayment deleted successfully!` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal error occurred" });
    });
};

exports.getPaymentByMemberId = async (req, res) => {
  try {
    const result = await Payment.findOne({
      gymMember: ObjectId(req.params.memberId),
    }).populate("gymMember", " membershipNo name");

    res.status(200).json({ message: "Payment By User Id ", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.memberPaymentById = async (req, res, next, id) => {
  const memberPayment = await Payment.findById(id);
  if (!memberPayment) {
    return res.status(400).json({ error: "memberPayment Not Found" });
  }
  req.memberPayment = memberPayment;
  next();
};
