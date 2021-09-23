const { body } = require("express-validator");

exports.registerTrainerValidator = [
  body("name").notEmpty().withMessage("name can not be empty"),
  body("email").notEmpty().withMessage("email can not be empty"),
  body("email").isEmail().withMessage("email not valid"),
  body("address").notEmpty().withMessage("address can not be empty"),
  body("mobile").notEmpty().withMessage("mobile can not be empty"),
  body("experience").notEmpty().withMessage("experience can not be empty"),
  body("salary").notEmpty().withMessage("salary can not be empty"),
];
