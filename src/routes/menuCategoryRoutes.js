// Import express
const express = require("express");

// Create router
const router = express.Router();

// Import middleware
const { protect } = require("../middleware/authMiddleware");

// Import controller
const {
    getMenuCategories,
    createMenuCategory,
    getMenuCategoryById,
    updateMenuCategory,
    deleteMenuCategory,
} = require("../controllers/menuCategoryController");

// Routes
router
    .route("/")
    .get(getMenuCategories)
    .post(protect, createMenuCategory);

router
    .route("/:id")
    .get(getMenuCategoryById)
    .put(protect, updateMenuCategory)
    .delete(protect, deleteMenuCategory);

// Export router
module.exports = router;