const express = require('express');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const { name,age,mobileNo,city,username, password, email } = req.body;

  // Validate input
  if (!name ||!age ||!mobileNo ||!city ||!username || !password || !email) {
    return res.status(400).send('All fields are required');
  }

  try {
    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new user({name,age,mobileNo,city, username, password: hashedPassword, email });
    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
