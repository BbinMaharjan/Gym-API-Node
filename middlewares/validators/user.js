const { body } = require("express-validator");

exports.registerUserValidator = [
  body("name").notEmpty().withMessage("name can not be empty"),
  body("email").notEmpty().withMessage("email can not be empty"),
  body("email").isEmail().withMessage("email not valid"),
  body("password").notEmpty().withMessage("password can not be empty"),
  body("mobile").notEmpty().withMessage("mobile can not be empty"),
];

exports.loginUserValidator = [
  body("email").notEmpty().withMessage("email can not be empty"),
  body("email").isEmail().withMessage("not a valid email"),
  body("password").notEmpty().withMessage("password can not be empty"),
];
