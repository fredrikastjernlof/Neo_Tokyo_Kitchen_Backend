// Import express
const express = require("express");

// Create router
const router = express.Router();

// Import middlewares
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Import controller
const {
    getMenuCategories,
    createMenuCategory,
    getMenuCategoryById,
    updateMenuCategory,
    deleteMenuCategory,
    uploadCategoryImage,
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

router
    .route("/:id/image")
    .post(protect, upload.single("image"), uploadCategoryImage);

// Export router
module.exports = router;