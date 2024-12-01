const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Signup Route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Verify password
        if (user.password !== password) { // Simple check (no hashing for now)
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Login successful
        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login. Please try again later.' });
    }
});


module.exports = router;
