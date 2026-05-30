// Import packages
const jwt = require("jsonwebtoken");

// Import model
const User = require("../models/userModel");

// Protect routes with JWT
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
     return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

// Allow only admin users
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }

    return res.status(403).json({
        message: "You do not have permission to add users",
    });
};

module.exports = { protect, adminOnly };