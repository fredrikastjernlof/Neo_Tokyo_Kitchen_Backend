// Import express
const express = require("express");

// Create router
const router = express.Router();

// Import controller
const {
    registerUser,
    loginUser,
    getUsers,
    deleteUser,
} = require("../controllers/authController");

// Import middleware
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Routes
router.post("/register", protect, adminOnly, registerUser);
router.post("/login", loginUser);

router
    .route("/users")
    .get(protect, adminOnly, getUsers);
    
router
    .route("/users/:id")
    .delete(protect, adminOnly, deleteUser);


// Export router
module.exports = router;