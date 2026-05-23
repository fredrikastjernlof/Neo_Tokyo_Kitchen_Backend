const Booking = require("../models/bookingModel");

// Create booking
const createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create booking",
            error: error.message,
        });
    }
};

//Get all bookings
const getBookings = async (req, res) => {
    try {
        // Show bookings in ascending order
        const bookings = await Booking.find().sort({ startTime: 1 });

        res.status(200).json(bookings);
    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch bookings",
            error: error.message,
        });
    }
};

// Get single booking by id
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch booking",
            error: error.message,
        });
    }
};

// Update booking by id
const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!updatedBooking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({
            message: "Failed to update booking",
            error: error.message,
        });
    }
};

// Delete booking
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        res.status(200).json({
            message: "Booking deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete booking",
            error: error.message,
        });
    }
};

// Export controller
module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
};