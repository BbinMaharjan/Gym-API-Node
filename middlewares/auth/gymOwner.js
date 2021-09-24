const User = require("../../models/User");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log({ token });
  if (token) {
    const user = parseToken(token);
    const foundUser = await User.findById(user._id).select("name role email");
    if (foundUser) {
      req.auth = foundUser;
      next();
    } else {
      res.status(401).json({ error: "User is not authorized" });
    }
  } else {
    res.status(401).json({ error: "User is not authorized" });
  }
};

exports.isGymOwner = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);
    const foundUser = await User.findById(user._id).select("name role email");
    if (foundUser && foundUser.role === "GymOwner") {
      req.gymOwner = foundUser;
      next();
    } else {
      res.status(401).json({ error: "User is not authorized" });
    }
  } else {
    res.status(401).json({ error: "User is not authorized" });
  }
};

function parseToken(token) {
  try {
    return jwt.verify(token.split(" ")[1], "myhiddensecret");
  } catch (err) {
    return false;
  }
}
