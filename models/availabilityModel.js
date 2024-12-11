const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    beds: { type: Number, required: true, default: 5 },
    opds: { type: Number, required: true, default: 5 },
});

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
