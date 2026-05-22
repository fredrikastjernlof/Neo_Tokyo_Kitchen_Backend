// Import mongoose
const mongoose = require("mongoose");

// Create schema for menu categories
const menuCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
        },

        slug: {
            type: String,
            required: [true, "Category slug is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Category description is required"],
            trim: true,
        },

        image: {
            filename: {
                type: String,
                default: "",
            },
            path: {
                type: String,
                default: "",
            },
            altText: {
                type: String,
                required: [true, "Image alt text is required"],
                trim: true,
            },
        },

        sortOrder: {
            type: Number,
            default: 0,
        },

        isActive: {
            type: Boolean,
            dafault: true,
        },
    },
    {
        timestamps: true,
    }
);

// Export model
module.exports = mongoose.model("MenuCategory", menuCategorySchema);