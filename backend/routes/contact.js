const express = require('express');
const router = express.Router();
const Contact = require('../models/contactuser');

// Define contact form submission route
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const newContact = new Contact({
    name,
    email,
    message,
  });

  try {
    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to submit contact form' });
  }
});

module.exports = router;
