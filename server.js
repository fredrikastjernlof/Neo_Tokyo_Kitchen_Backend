// Insert packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

const menuCategoryRoutes = require("./src/routes/menuCategoryRoutes");

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

// Test route
app.get("/", (req, res) => {
    res.json({ message: "🇯🇵 Neo Tokyo Kitchen API is running 🍜🥳"});
});

// Set port
const PORT = process.env.PORT || 5001;

// Start server 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

