const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    hashed_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
    },
    phoneNumber: {
      type: Number,
      trim: true,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

// virtual field

UserSchema.virtual("password")
  .set(function (password) {
    // temporary variable called _password
    this._password = password;

    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";

    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
