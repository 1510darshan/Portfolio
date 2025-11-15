const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    const skills = await Skill.find(query).sort({ order: 1, name: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/skills
// @desc    Create new skill
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json({ success: true, data: skill, message: 'Skill created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, data: skill, message: 'Skill updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/skills/:id
// @desc    Delete skill
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
