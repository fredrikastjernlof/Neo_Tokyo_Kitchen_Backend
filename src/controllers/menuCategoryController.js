// Import model
const MenuCategory = require("../models/menuCategoryModel");

// Import sharp
const sharp = require("sharp");

// Import file system promises
const fs = require("fs/promises");

// Import path
const path = require("path");



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
                returnDocument: "after",
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

        res.status(200).json({
            message: "Menu category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete menu category",
            error: error.message,
        });
    }
};


// Upload category image
const uploadCategoryImage = async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                message: "No image file uploaded",
            });
        }

        // Find category
        const category = await MenuCategory.findById(req.params.id);

        if (!category) {
            // Remove temporary file if category does not exist
            await fs.unlink(req.file.path);

            return res.status(404).json({
                message: "Category not found",
            });
        }

        // Create unique webp filename
        const webpFilename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;

        // Create output path
        const outputPath = path.join("src/uploads/categories", webpFilename);

        // Convert image to webp and resize
        await sharp(req.file.path)
            .resize({
                width: 900,
                withoutEnlargement: true,
            })
            .webp({
                quality: 75,
            })
            .toFile(outputPath);

        // Remove temporary upload file
        await fs.unlink(req.file.path);

        // Remove old category image if it exists
        if (category.image && category.image.filename) {
            const oldImagePath = path.join(
                "src/uploads/categories",
                category.image.filename
            );

            try {
                await fs.unlink(oldImagePath);
            } catch (error) {
                console.log("Old image could not be removed:", error.message);
            }
        }

        // Update category image data
        category.image = {
            filename: webpFilename,
            path: `/uploads/categories/${webpFilename}`,
            altText: req.body.altText || category.name,
        };

        // Save updated category
        await category.save();

        // Send response
        res.status(200).json(category);

    } catch (error) {
        res.status(500).json({
            message: "Failed to upload category image",
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
    uploadCategoryImage,
};