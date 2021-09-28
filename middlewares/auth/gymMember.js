const Member = require("../../models/Member");
const jwt = require("jsonwebtoken");

exports.isMember = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const member = parseToken(token);
    const foundMember = await Member.findById(member._id).select(
      "name membershipNo"
    );
    if (foundMember) {
      req.member = foundMember;
      next();
    } else {
      res.status(401).json({ error: "Member is not authorized" });
    }
  } else {
    res.status(401).json({ error: "Member is not authorized" });
  }
};

function parseToken(token) {
  try {
    return jwt.verify(token.split(" ")[1], "myhiddensecret");
  } catch (err) {
    return false;
  }
}
