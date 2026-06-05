// Import packages
const jwt = require("jsonwebtoken");

// Import model
const User = require("../models/userModel");

// Create JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

// Register new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to register user",
            error: error.message,
        });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({
                message: "Invalid email or password",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to login user",
            error: error.message,
        });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        if (req.user._id.toString() === req.params.id) {
            return res.status(400).json({
                message: "You cannot delete your own account",
            });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete user",
            error: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    deleteUser,
};