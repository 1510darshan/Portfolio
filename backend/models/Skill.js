const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 50
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'language', 'database', 'tools', 'other'],
    default: 'other'
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Skill', skillSchema);
