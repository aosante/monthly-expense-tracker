const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const validateValues = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return { errors: errors.array() };
  }
};

// @desc    load current user
// @route   POST /api/v1/users
// @access  Public
exports.registerUser = async (req, res) => {
  const validation = validateValues(req);
  if (validation) {
    return res.status(400).json({ errors: validation.errors });
  }

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exists.' }] });

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, secret, { expiresIn: '14400000' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update or add monthly amount (budget or limit)
// @route   PUT /api/v1/users/update-amount
// @access  Private
exports.updateAmount = async (req, res) => {
  const validation = validateValues(req);
  if (validation) {
    return res.status(400).json({ errors: validation.errors });
  }
  const { amount } = req.body;

  try {
    await User.findByIdAndUpdate(req.user.id, {
      $set: { amount, amountChanged: true },
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @desc    Resets usr balance to zero and deletes all of the user's transactions
// @route   PUT /api/v1/users/reset
// @access  Private
exports.reset = async (req, res) => {
  try {
    // set user.amount to zero and user.amountToChanged back to false
    await User.findByIdAndUpdate(req.user.id, {
      $set: { amount: 0, amountChanged: false },
    });
    // delete user's transactions
    // await Transaction.deleteMany({ user: req.user.id });
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
