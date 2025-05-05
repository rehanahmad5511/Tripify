const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  currentUser: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  guestCount: {
    type: Number,
    required: true,
    min: 1,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reservation', reservationSchema);
