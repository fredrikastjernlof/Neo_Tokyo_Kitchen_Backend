// Import express
const express = require("express");

// Create router
const router = express.Router();

// Import middleware
const { protect } = require("../middleware/authMiddleware");

// Import controller
const {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
} = require("../controllers/bookingController");

// Routes
router
    .route("/")
    .get(protect, getBookings)
    .post(createBooking);

// Routes by booking id
router
    .route("/:id")
    .get(protect, getBookingById)
    .put(protect, updateBooking)
    .delete(protect, deleteBooking);    

// Export router
module.exports = router;