const Reservation = require('../models/tour1.js');

exports.createReservation = async (req, res) => {
  try {
    const { currentUser, firstName, lastName, date, phone, guestCount } = req.body;

    if (!currentUser || !firstName || !lastName || !date || !phone || !guestCount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newReservation = new Reservation({
      currentUser,
      firstName,
      lastName,
      date,
      phone,
      guestCount,
    });

    await newReservation.save();

    res.status(201).json({ message: 'Tour reservation successfully created' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create reservation', error: error.message });
  }
};
exports.getAllReservations = async (req, res) => {
    try {
      const reservations = await Reservation.find(); // Fetch all reservations
  
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch reservations', error: error.message });
    }
  };