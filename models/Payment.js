const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    gymMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    paymentType: {
      type: String,
      enum: ["Admission", "Monthly", "Package"],
      required: true,
    },
    paymentMonth: {
      type: String,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    paymentPackage: {
      type: String,
      enum: ["Yearly", "Half Yearly", "Quarterly"],
    },

    paidAmount: {
      type: Number,
      maxlength: 100,
      required: true,
    },
    gymOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
