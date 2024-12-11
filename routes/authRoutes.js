const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Make sure this path is correct based on your project structure
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    // Find the user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).send('User not found');
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    // Successful login, return user data (or any other desired information)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        username: existingUser.username,
        age: existingUser.age,
        mobileNo: existingUser.mobileNo,
        city: existingUser.city,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
