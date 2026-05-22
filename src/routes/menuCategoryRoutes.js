// Import express
const express = require("express");

// Create router
const router = express.Router();

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
    .post(createMenuCategory);

router
    .route("/:id")
    .get(getMenuCategoryById)
    .put(updateMenuCategory)
    .delete(deleteMenuCategory);

// Export router
module.exports = router;