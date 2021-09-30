const { body } = require("express-validator");

exports.registerAdminValidator = [
  body("name").notEmpty().withMessage("name can not be empty"),
  body("email").notEmpty().withMessage("email can not be empty"),
  body("email").isEmail().withMessage("email not valid"),
  body("password")
    .notEmpty()
    .isLength({ min: 2, max: 10 })
    .withMessage("password can not be empty"),
  body("mobile")
    .notEmpty()
    .isLength({ min: 5, max: 10 })
    .withMessage("mobile can not be empty"),
];

exports.loginAdminValidator = [
  body("email").notEmpty().withMessage("email can not be empty"),
  body("email").isEmail().withMessage("not a valid email"),
  body("password").notEmpty().withMessage("password can not be empty"),
];
