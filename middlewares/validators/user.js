const { body } = require("express-validator");

exports.registerUserValidator = [
  body("name").notEmpty().withMessage("name can not be empty"),
  body("email").notEmpty().withMessage("email can not be empty"),
  body("address").notEmpty().withMessage("address can not be empty"),
  body("gender").notEmpty().withMessage("gender can not be empty"),
  body("password").notEmpty().withMessage("password can not be empty"),
  body("phoneNumber").notEmpty().withMessage("phoneNumber can not be empty"),
];
