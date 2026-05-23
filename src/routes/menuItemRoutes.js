// Import express
const express = require("express");

// create router
const router = express.Router();

// Import middleware
const { protect } = require("../middleware/authMiddleware");


//Import controller
const {
    getMenuItems,
    getMenuItemsByCategory,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} = require("../controllers/menuItemController");

// Routes
router
    .route("/")
    .get(getMenuItems)
    .post(protect, createMenuItem);

router.get("/category/:slug", getMenuItemsByCategory);

router
  .route("/:id")
  .get(getMenuItemById)
  .put(protect, updateMenuItem)
  .delete(protect, deleteMenuItem);
  
module.exports = router;