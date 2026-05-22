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

// Export
module.exports = {
    getMenuCategories,
};