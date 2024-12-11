const express = require('express');
const router = express.Router();
const Availability = require('../models/availabilityModel');

// Get OPD Availability
router.get('/availability', async (req, res) => {
    const availability = await Availability.findOne();
    res.json({ opdsAvailable: availability.opds });
});

// Book an OPD
router.post('/book', async (req, res) => {
    const availability = await Availability.findOne();
    if (availability.opds > 0) {
        availability.opds -= 1;
        await availability.save();
        res.json({ message: 'OPD booked successfully', opdsAvailable: availability.opds });
    } else {
        res.status(400).json({ message: 'No OPDs available' });
    }
});

// Release an OPD
router.post('/release', async (req, res) => {
    const availability = await Availability.findOne();
    if (availability.opds < 5) {
        availability.opds += 1;
        await availability.save();
        res.json({ message: 'OPD released successfully', opdsAvailable: availability.opds });
    } else {
        res.status(400).json({ message: 'All OPDs are already available' });
    }
});

module.exports = router;
