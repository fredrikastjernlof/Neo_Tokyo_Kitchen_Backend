// Import express
const express = require("express");

// Create router
const router = express.Router();

// Import controller
const {
    getMenuCategories,
} = require("../controllers/menuCategoryController");

// Routes
router.get("/", getMenuCategories);

// Export router
module.exports = router;