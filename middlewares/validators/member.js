const { body } = require("express-validator");

exports.registerMemberValidator = [
  body("membershipNo")
    .notEmpty()
    .withMessage("membership number can not be empty"),
  body("name").notEmpty().withMessage("name can not be empty"),
  body("email").notEmpty().withMessage("email can not be empty"),
  body("email").isEmail().withMessage("email not valid"),
  body("address").notEmpty().withMessage("address can not be empty"),
  body("mobile").notEmpty().withMessage("mobile can not be empty"),
];
