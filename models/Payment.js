const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    paidAmount: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["Admission", "Monthly"],
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
