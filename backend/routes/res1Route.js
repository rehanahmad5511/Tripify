const express = require("express");
const router = express.Router();
const { getAllReservations } = require("../controllers/res1Controller");
const { getTourById } = require("../controllers/tour1controller");
const { deleteTourReservation } = require('../controllers/res1Controller');


// ✅ Static route first
router.get("/tourReservations", getAllReservations);

// 🛑 Dynamic route afterwards
router.get("/:id", getTourById);

// routes/reservation.route.js

router.delete("/tourReservations/:id", deleteTourReservation); // Delete reservation






module.exports = router;
