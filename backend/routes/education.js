const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/education
// @desc    Get all education
// @access  Public
router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/education
// @desc    Create new education
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json({ success: true, data: education, message: 'Education created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/education/:id
// @desc    Update education
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.json({ success: true, data: education, message: 'Education updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/education/:id
// @desc    Delete education
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.json({ success: true, message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
