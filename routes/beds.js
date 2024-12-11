const express = require('express');
const router = express.Router();
const Availability = require('../models/availabilityModel');

// Get Bed Availability
router.get('/availability', async (req, res) => {
    const availability = await Availability.findOne();
    res.json({ bedsAvailable: availability.beds });
});

// Book a Bed
router.post('/book', async (req, res) => {
    const availability = await Availability.findOne();
    if (availability.beds > 0) {
        availability.beds -= 1;
        await availability.save();
        res.json({ message: 'Bed booked successfully', bedsAvailable: availability.beds });
    } else {
        res.status(400).json({ message: 'No beds available' });
    }
});

// Release a Bed
router.post('/release', async (req, res) => {
    const availability = await Availability.findOne();
    if (availability.beds < 5) {
        availability.beds += 1;
        await availability.save();
        res.json({ message: 'Bed released successfully', bedsAvailable: availability.beds });
    } else {
        res.status(400).json({ message: 'All beds are already available' });
    }
});

module.exports = router;
