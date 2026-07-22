const mongoose = require('mongoose');

const bmiRecordSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    height: { type: Number, required: true },
    heightUnit: { type: String, enum: ['cm', 'm'], default: 'cm' },
    weight: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String },
    activity: { type: String },
    goal: { type: String },
    pref: { type: String },
    conds: [{ type: String }],
    bmi: { type: Number, required: true },
    category: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('BmiRecord', bmiRecordSchema);
