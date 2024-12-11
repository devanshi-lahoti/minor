const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Availability = require('./models/availabilityModel'); // Availability model for beds and OPDs

// Import routes
const bedRoutes = require('./routes/beds');
const opdRoutes = require('./routes/opds');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dbConfig = require('./config/db'); // Configuration for MongoDB URI and server port

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
    .connect(dbConfig.mongodbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(' Connected to MongoDB'))
    .catch((err) => {
        console.error(' Could not connect to MongoDB:', err.message);
        process.exit(1); // Exit process if MongoDB connection fails
    });

// Seed Data if not exists
const seedDatabase = async () => {
    const availability = await Availability.findOne();
    if (!availability) {
        await Availability.create({ beds: 5, opds: 5 });
        console.log(' Database initialized with default values.');
    }
};
seedDatabase();

// Routes
app.use('/api/beds', bedRoutes); // Beds-related routes
app.use('/api/opds', opdRoutes); // OPDs-related routes
app.use('/api/user', userRoutes); // User-related routes
app.use('/api/auth', authRoutes); // Authentication-related routes

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({
        message: ' Hospital Management API is running!',
        documentation: 'Add a link to API documentation here (if applicable)',
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong! Please try again later.' });
});

// Start Server
const PORT = dbConfig.port || 3000; // Default to 3000 if no port is specified
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
