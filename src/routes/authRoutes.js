// Import express
const express = require("express");

// Create router
const router = express.Router();

// Import controller
const {
    registerUser,
    loginUser,
} = require("../controllers/authController");

// Import middleware
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Routes
router.post("/register", protect, adminOnly, registerUser);
router.post("/login", loginUser);
// Export router
module.exports = router;