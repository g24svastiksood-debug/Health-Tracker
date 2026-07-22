const express = require('express');
const ContactMessage = require('../models/ContactMessage');

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all fields.' });
    }
    await ContactMessage.create({ name, email, message });
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error sending message.' });
  }
});

module.exports = router;
