const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  loginUser,
  read,
  userById,
} = require("../controllers/user");
const {
  registerUserValidator,
  loginUserValidator,
} = require("../middlewares/validators/user");

router.get("/", getAllUsers);

router.post("/register", [...registerUserValidator], registerUser);
router.post("/login", [...loginUserValidator], loginUser);
router.get("/:userId", read);

router.param("userId", userById);

module.exports = router;
