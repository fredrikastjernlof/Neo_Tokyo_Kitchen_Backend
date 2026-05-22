// Import express
const express = require("express");

// create router
const router = express.Router();


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
    .post(createMenuItem);

router.get("/category/:slug", getMenuItemsByCategory);

router
  .route("/:id")
  .get(getMenuItemById)
  .put(updateMenuItem)
  .delete(deleteMenuItem);
  
module.exports = router;