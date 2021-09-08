const express = require("express");
const router = express.Router();
const { registerUser, getAllUsers } = require("../controllers/user");
const { registerUserValidator } = require("../middlewares/validators/user");

router.get("/", getAllUsers);

router.post("/register", [...registerUserValidator], registerUser);

module.exports = router;
