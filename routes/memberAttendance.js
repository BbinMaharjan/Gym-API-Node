const express = require("express");
const router = express.Router();
const {
  getAllmemberAttendance,
  addmemberAttendance,
} = require("../controllers/memberAttendance");

router.get("/", getAllmemberAttendance);

router.post("/addmemberAttendance", addmemberAttendance);

module.exports = router;
