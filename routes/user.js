const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  read,
  userById,
} = require("../controllers/user");
const { registerUserValidator } = require("../middlewares/validators/user");

router.get("/", getAllUsers);

router.post("/register", [...registerUserValidator], registerUser);
router.get("/:userId", read);

router.param("userId", userById);

module.exports = router;
