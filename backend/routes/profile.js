const express = require('express');
const User = require('../models/User');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// PUT /api/profile
router.put('/', requireAuth, async (req, res) => {
  try {
    const { name, age, dietPreference } = req.body;
    const update = {};
    if (name) update.name = name;
    if (age !== undefined) update.age = age;
    if (dietPreference) update.dietPreference = dietPreference;

    const user = await User.findByIdAndUpdate(req.userId, update, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        dietPreference: user.dietPreference
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error updating profile.' });
  }
});

module.exports = router;
