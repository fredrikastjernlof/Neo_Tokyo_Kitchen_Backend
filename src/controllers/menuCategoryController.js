// Import model
const MenuCategory = require("../models/menuCategoryModel");

// Get all menu categorys
const getMenuCategories = async (req, res) => {
    try {
        const categories = await MenuCategory.find().sort({
            sortOrder: 1,
        });

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch menu categories",
        });
    }
};

// Create new menu Category
const createMenuCategory = async (req, res) => {
    try {
        const newCategory = await MenuCategory.create(req.body);

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create menu category",
            error: error.message,
        });
    }
};

// Get single menu category by id
const getMenuCategoryById = async (req, res) => {
    try {
        const category = await MenuCategory.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Menu category not found",
            });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch menu category",
            error: error.message,
        });
    }
};

// Update menu category by id
const updateMenuCategory = async (req, res) => {
    try {
        const updatedCategory = await MenuCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                message: "Menu category not found",
            });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({
            message: "Failed to update menu category",
            error: error.message,
        });
    }
};

// Delete menu category by id
const deleteMenuCategory = async (req, res) => {
    try {
        const deletedCategory = await MenuCategory.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({
                message: "Menu category not found",
            });
        }

        res.status(200).json(deletedCategory);
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete menu category",
            error: error.message,
        });
    }
};

// Export
module.exports = {
    getMenuCategories,
    createMenuCategory,
    getMenuCategoryById,
    updateMenuCategory,
    deleteMenuCategory,
};