const express = require("express");
const router = express.Router();
const {
  getAllmemberAttendance,
  addmemberAttendance,
} = require("../controllers/memberAttendance");

const { isGymOwner } = require("../middlewares/auth/gymOwner");

router.get("/", isGymOwner, getAllmemberAttendance);

router.post("/addmemberAttendance", isGymOwner, addmemberAttendance);

module.exports = router;
