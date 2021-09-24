const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    paidAmount: {
      type: Number,
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
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
