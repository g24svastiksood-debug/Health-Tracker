const express = require('express');
const BmiRecord = require('../models/BmiRecord');
const requireAuth = require('../middleware/auth');

const router = express.Router();

function categoryFor(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal Weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

// POST /api/bmi  -> save a new BMI record for the logged-in user
router.post('/', requireAuth, async (req, res) => {
  try {
    const { height, heightUnit, weight, age, gender, activity, goal, pref, conds, bmi } = req.body;

    if (!height || !weight || !age || !bmi) {
      return res.status(400).json({ error: 'Missing required BMI fields.' });
    }

    const record = await BmiRecord.create({
      user: req.userId,
      height,
      heightUnit: heightUnit || 'cm',
      weight,
      age,
      gender,
      activity,
      goal,
      pref,
      conds: conds || [],
      bmi,
      category: categoryFor(bmi)
    });

    res.status(201).json({ record });
  } catch (err) {
    res.status(500).json({ error: 'Server error saving BMI record.' });
  }
});

// GET /api/bmi -> get history for the logged-in user (most recent first)
router.get('/', requireAuth, async (req, res) => {
  try {
    const records = await BmiRecord.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json({ records });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching BMI history.' });
  }
});

module.exports = router;
