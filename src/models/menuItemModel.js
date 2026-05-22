// Import mongoose
const mongoose = require("mongoose");

// Create schema for menu items
const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Menu item name is required"],
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Menu item description is required"],
            trim: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuCategory",
            required: [true, "Menu item category is required"],
        },

        price: {
            type: Number,
            required: [true, "Menu item price is required"],
            min: [0, "Price cannot be negative"],
        },

        dietary: {
            vegan: {
                type: Boolean,
                default: false,
            },
            vegetarian: {
                type: Boolean,
                default: false,
            },
            glutenFree: {
                type: Boolean,
                default: false,
            },
        },

        protein: {
            type: String,
            enum: [
                "beef",
                "chicken",
                "duck",
                "egg",
                "pork",
                "seafood",
                "shrimp",
                "salmon",
                "tofu",
                "mixed",
                "none"
            ],
            default: "none",
        },

        spiceLevel: {
            type: Number,
            min: [0, "Spice level cannot be lower than 0"],
            max: [3, "Spice level cannot be higher than 3"],
            default: 0,
        },

        tags: {
            type: [String],
            default: [],
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },

        sortOrder: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Export model
module.exports = mongoose.model("MenuItem", menuItemSchema);
