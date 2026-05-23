// Import mongoose
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Guest name is required"],
            trim: true,
        },

         email: {
            type: String,
            required: [true, "Guest email is required"],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            match: [/^[0-9+\-\s()]{6,20}$/, "Please enter a valid phone number"],
        },

        guests: {
            type: Number,
            required: [true, "Number of guests is required"],
            min: [1, "At least one guest is required"],
            max: [12, "Maximum number of guests is 12"],
        },

        startTime: {
            type: Date,
            required: [true, "Booking start time is required"],
        },

        durationMinutes: {
            type: Number,
            default: 90,
            min: 30,
            max: 240,
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending",
            trim: true,
        },

        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

// Export model
module.exports = mongoose.model("Booking", bookingSchema);