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
    hashed_password: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["SuperAdmin", "GymOwner"],
      default: "GymOwner",
    },
    gymTitle: {
      type: String,
      trim: true,
      required: false,
    },
    gymLocation: {
      type: String,
      trim: true,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    isVerified: {
      default: false,
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

module.exports = mongoose.model("User", UserSchema);
