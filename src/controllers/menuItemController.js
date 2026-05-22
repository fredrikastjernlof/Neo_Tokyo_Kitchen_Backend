// Import model
const MenuItem = require("../models/menuItemModel");

// Get all menu items
const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find()
            .populate("category")
            .sort({ sortOrder: 1 });

        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch menu items",
            error: error.message,
        });
    }
};

// Create new menu item
const createMenuItem = async (req, res) => {
    try {
        const newMenuItem = await MenuItem.create(req.body);

        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create menu item",
            error: error.message,
        });
    }
};

// Get menu items by category slug
const getMenuItemsByCategory = async (req, res) => {
    try {
        const menuItems = await MenuItem.find()
            .populate("category")
            .sort({ sortOrder: 1 });

        const filteredItems = menuItems.filter(
            (item) => item.category.slug === req.params.slug
        );

        res.status(200).json(filteredItems);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch menu items by category",
            error: error.message,
        });
    }
};

// Get single menu item by id
const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id).populate(
            "category"
        );

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found",
            });
        }

        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch menu item",
            error: error.message,
        });
    }
};

// Update menu item by id
const updateMenuItem = async (req, res) => {
    try {
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedMenuItem) {
            return res.status(404).json({
                message: "Menu item not found",
            });
        }

        res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(400).json({
            message: "Failed to update menu item",
            error: error.message,
        });
    }
};

// Delete menu item by id
const deleteMenuItem = async (req, res) => {
    try {
        const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);

        if (!deletedMenuItem) {
            return res.status(404).json({
                message: "Menu item not found",
            });
        }

        res.status(200).json({
            message: "Menu item deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete menu item",
            error: error.message,
        });
    }
};

module.exports = {
    getMenuItems,
    getMenuItemsByCategory,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
};