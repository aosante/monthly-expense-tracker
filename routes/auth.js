const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { loadUser } = require('../controllers/auth.controller');

router.get('/', auth, loadUser);

module.exports = router;
