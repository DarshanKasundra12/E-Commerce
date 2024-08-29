const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Signup route
router.post('/signup', authController.signup);

// Signin route
router.post('/signin', authController.signin);

// Fetch users route
router.get('/signup', authController.getUsers);

router.get('/count', async (req, res) => {
  try {
      // Count the number of documents in the customers collection
      const count = await Customer.countDocuments();
      // Send the count as a JSON response
      res.json({ count });
  } catch (error) {
      // If an error occurs, send a 500 status code and error message
      console.error('Error fetching customer count:', error);
      res.status(500).json({ message: 'Error fetching customer count' });
  }
});

module.exports = router;
