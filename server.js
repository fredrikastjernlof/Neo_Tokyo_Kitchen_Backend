// Insert packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

const menuCategoryRoutes = require("./src/routes/menuCategoryRoutes");
const menuItemRoutes = require("./src/routes/menuItemRoutes");
const authRoutes = require("./src/routes/authRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");

// Load enviroment variables
dotenv.config();

// Connect to database
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

