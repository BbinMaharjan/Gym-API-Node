const express = require("express");

const router = express.Router();

const {
  addAdmin,
  loginAdmin,
  getAdminProfile,
  getGymOwner,
  updateGymOwner,
  deleteGymOwner,
  gymOwnerById,
} = require("../controllers/adminDashboard");
const { getAllgymExercise } = require("../controllers/gymExercise");
const { getAllMember } = require("../controllers/member");
const { uploadAdminImage } = require("../helper/multer");
const {
  registerAdminValidator,
  loginAdminValidator,
} = require("../middlewares/validators/admin");
const { isAdmin } = require("../middlewares/auth/admin");

router.post("/register", uploadAdminImage, addAdmin);
router.post("/login", [...loginAdminValidator], loginAdmin);
router.get("/adminprofile", isAdmin, getAdminProfile);
router.get("/gymowners", isAdmin, getGymOwner);
router.get("/gymexercise", isAdmin, getAllgymExercise);
router.get("/gymmembers", isAdmin, getAllMember);

router.put("/gymowners/updategymowner/:gymownerid", isAdmin, updateGymOwner);
router.delete("/gymowners/deletegymowner/:gymownerid", isAdmin, deleteGymOwner);

router.param("gymownerid", gymOwnerById);
module.exports = router;
