const express = require("express");

const router = express.Router();

const {
  registerGymOwner,
  loginGymOwner,
  getGymOwnerProfile,
} = require("../controllers/gymOwnerDashboard");

const {
  updateGymOwner,
  gymOwnerById,
} = require("../controllers/adminDashboard");
const {
  loginGymOwnerValidator,
} = require("../middlewares/validators/gymOwner");
const { uploadGymOwnerImage } = require("../helper/multer");
const { isGymOwner } = require("../middlewares/auth/gymOwner");

router.post("/register", uploadGymOwnerImage, registerGymOwner);
router.post("/login", [...loginGymOwnerValidator], loginGymOwner);
router.get("/gymownerprofile", isGymOwner, getGymOwnerProfile);


router.put("/gymowners/updategymowner/:gymownerid", isGymOwner, updateGymOwner);

router.param("gymownerid", gymOwnerById);
module.exports = router;
