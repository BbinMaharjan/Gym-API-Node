const express = require("express");
const router = express.Router();
const {
  getAllMemberPackage,
  addMemberPackage,
} = require("../controllers/memberPackage");

router.get("/", getAllMemberPackage);

router.post("/addmemberPackage", addMemberPackage);

module.exports = router;
