const express = require("express");
const router = express.Router();
const {
  getAllMemberPayment,
  addMemberPayment,
  updateMemberPayment,
  deleteMemberPayment,
  memberPaymentById,
  getPaymentByMemberId,
} = require("../controllers/memberPayment");

const { isGymOwner } = require("../middlewares/auth/gymOwner");

router.get("/", isGymOwner, getAllMemberPayment);

router.post("/addMemberPayment", isGymOwner, addMemberPayment);

router.put("/memberPayment/:memberPaymentId", isGymOwner, updateMemberPayment);

router.delete(
  "/memberPayment/:memberPaymentId",
  isGymOwner,
  deleteMemberPayment
);
router.get("/memberPayment/:memberId", isGymOwner, getPaymentByMemberId);

router.param("memberPaymentId", memberPaymentById);
module.exports = router;
