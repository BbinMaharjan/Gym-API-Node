const Payment = require("../models/Payment");
const mongoose = require("mongoose");

exports.getAllMemberPayment = async (req, res) => {
  try {
    const result = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All MemberPayment", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addMemberPayment = async (req, res) => {
  try {
    const { paidAmount, paymentType, paymentMonth, memberId } = req.body;

    const memberPayment = new Payment({
      paidAmount,
      paymentType,
      paymentMonth,
      member: memberId,
    });

    await memberPayment.save();
    res.status(200).json({ Message: " Member Payment Added", memberPayment });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};
