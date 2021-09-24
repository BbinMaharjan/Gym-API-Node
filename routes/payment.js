const express = require("express");
const router = express.Router();
const {
  getAllMemberPayment,
  addMemberPayment,
} = require("../controllers/memberPayment");

router.get("/", getAllMemberPayment);

router.post("/addMemberPayment", addMemberPayment);

module.exports = router;
