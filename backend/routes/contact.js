const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { read } = req.query;
    let query = {};

    if (read !== undefined) {
      query.read = read === 'true';
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PATCH /api/contact/:id/read
// @desc    Mark message as read
// @access  Private
router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact message
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
