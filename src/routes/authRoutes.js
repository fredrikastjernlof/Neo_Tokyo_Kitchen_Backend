// Import express
const express = require("express");

// Create router
const router = express.Router();

// Import controller
const {
    registerUser,
    loginUser,
} = require("../controllers/authController");

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Export router
module.exports = router;