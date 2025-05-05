const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour1controller');

// POST /tours/tourReservation
router.post('/tourReservation', tourController.createReservation);
router.get('/tourReservations', tourController.getAllReservations);

module.exports = router;




