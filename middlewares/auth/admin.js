const User = require("../../models/User");
const jwt = require("jsonwebtoken");

exports.isAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const admin = parseToken(token);
    const foundAdmin = await User.findById(admin._id).select("name email role");
    if (foundAdmin && foundAdmin.role === "SuperAdmin") {
      req.admin = foundAdmin;
      next();
    } else {
      res.status(401).json({ error: "Admin is not authorized" });
    }
  } else {
    res.status(401).json({ error: "Admin is not authorized" });
  }
};

function parseToken(token) {
  try {
    return jwt.verify(token.split(" ")[1], "myhiddensecret");
  } catch (err) {
    return false;
  }
}
