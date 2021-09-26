const express = require("express");
const router = express.Router();
const {
  getAllMemberPackage,
  addMemberPackage,
  updateMemberPackage,
  deleteMemberPackage,
  memberPackageById,
} = require("../controllers/memberPackage");

const { isGymOwner } = require("../middlewares/auth/gymOwner");

router.get("/", isGymOwner, getAllMemberPackage);

router.post("/addmemberPackage", isGymOwner, addMemberPackage);

router.put("/memberPackage/:memberPackageId", isGymOwner, updateMemberPackage);

router.delete(
  "/memberPackage/:memberPackageId",
  isGymOwner,
  deleteMemberPackage
);

router.param("memberPackageId", memberPackageById);

module.exports = router;
