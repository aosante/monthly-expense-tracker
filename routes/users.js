const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerUser } = require('../controllers/users.controller');

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

module.exports = router;
