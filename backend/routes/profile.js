const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/profile
// @desc    Get profile
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.getProfile();
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/profile
// @desc    Update profile
// @access  Private
router.put('/', authMiddleware, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    profile.updatedAt = Date.now();
    await profile.save();
    res.json({ success: true, data: profile, message: 'Profile updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
