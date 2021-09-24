const MemberPackage = require("../models/MemberPackage");

exports.getAllMemberPackage = async (req, res) => {
  try {
    const result = await MemberPackage.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All MemberPackage", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addMemberPackage = async (req, res) => {
  try {
    const { memberPackageType, price, gymOwnerId } = req.body;

    const memberPackage = new MemberPackage({
      memberPackageType,
      price,
      gymOwner: gymOwnerId,
    });

    await memberPackage.save();
    res
      .status(200)
      .json({ Message: " Member Attendance Added", memberPackage });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};
