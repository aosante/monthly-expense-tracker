const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator/check');
const { loadUser, login } = require('../controllers/auth.controller');

router.get('/', auth, loadUser);
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'The password is required').exists(),
  ],
  login
);

module.exports = router;
