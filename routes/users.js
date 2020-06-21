const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  registerUser,
  updateAmount,
  reset,
} = require('../controllers/users.controller');
const auth = require('../middleware/auth');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password of at least 6 characters'
    ).isLength({ min: 6 }),
  ],
  registerUser
);

router.put(
  '/update-amount',
  [check('amount', 'Amount must be greater than zero').isInt({ gt: 0 })],
  auth,
  updateAmount
);

router.put('/reset', auth, reset);

module.exports = router;
