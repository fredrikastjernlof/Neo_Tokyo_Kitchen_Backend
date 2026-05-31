// Insert packages
const dotenv = require("dotenv");

// Load enviroment variables
dotenv.config();

const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const menuCategoryRoutes = require("./src/routes/menuCategoryRoutes");
const menuItemRoutes = require("./src/routes/menuItemRoutes");
const authRoutes = require("./src/routes/authRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");

// Make sure upload folders exist
fs.mkdirSync("src/uploads/temp", { recursive: true });
fs.mkdirSync("src/uploads/categories", { recursive: true });

// Connect to database
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// Routes
app.use("/api/categories", menuCategoryRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({ message: "🇯🇵 Neo Tokyo Kitchen API is running 🍜🥳" });
});

// Set port
const PORT = process.env.PORT || 5001;

// Start server 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

