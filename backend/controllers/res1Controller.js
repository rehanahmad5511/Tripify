// controllers/tourReservationController.js

const Reservation = require("../models/tour1");

// Fetch all reservations (no user filter)
const getAllReservations = async (req, res) => {
    try {
        const reservations = await TourReservation.find(); // Fetch all reservations

        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ message: "No reservations found" });
        }

        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteTourReservation = async (req, res) => {
    try {
      const reservation = await TourReservation.findByIdAndDelete(req.params.id);
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

module.exports = { getAllReservations, deleteTourReservation };
