const MemberPackage = require("../models/MemberPackage");

exports.getAllMemberPackage = async (req, res) => {
  try {
    const result = await MemberPackage.find()
      .sort({ createdAt: -1 })
      .populate("gymOwner", "name mobile");
    res.status(200).json({ message: "All MemberPackage", result });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred" });
  }
};

exports.addMemberPackage = async (req, res) => {
  try {
    gymOwnerId = req.gymOwner.id;
    const { memberPackageType, price } = req.body;

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

exports.updateMemberPackage = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Data can not be empty!" });
    }

    const result = await MemberPackage.findByIdAndUpdate(
      req.memberPackage._id,
      req.body,
      { useFindAndModify: false }
    );
    if (!result) {
      return res.status(400).send({ message: `MemberPackage not found` });
    } else {
      return res.send({ message: `MemberPackager data Updated successfully.` });
    }
  } catch (err) {
    res.status(500).send({ message: `Update Errorr` });
  }
};

exports.deleteMemberPackage = async (req, res) => {
  const memberPackageId = req.memberPackage._id;
  await MemberPackage.findByIdAndDelete(memberPackageId)
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: `MemberPackage not found!` });
      } else {
        return res.send({ message: `MemberPackage deleted successfully!` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal error occurred" });
    });
};

exports.memberPackageById = async (req, res, next, id) => {
  const memberPackage = await MemberPackage.findById(id);
  if (!memberPackage) {
    return res.status(400).json({ error: "memberPackage Not Found" });
  }
  req.memberPackage = memberPackage;
  next();
};
