const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require('../controllers/transactions.controller');
const auth = require('../middleware/auth');

// TODO: add express validator to addTransaction method
router
  .route('/')
  .get(auth, getTransactions)
  .post(
    auth,
    [
      check('text', 'You must enter a description').not().isEmpty(),
      check('amount', 'You must enter a valid amount').not().isEmpty().isInt(),
    ],
    addTransaction
  );

router.route('/:id').delete(deleteTransaction);

module.exports = router;
