const Transaction = require('../models/Transaction');

const throwError = (error, res) => {
  console.error(error.message);
  res.status(500).send('Server error');
};

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Private
exports.getTransactions = async (_, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (error) {
    throwError(error, res);
  }
};

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = { ...req.body, user: req.user.id };
    const transaction = await Transaction.create(newTransaction);
    res.json(transaction);
  } catch (error) {
    throwError(error, res);
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res) => {
  console.log(req.params.id);
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: 'No transaction found' });
    }

    await transaction.remove();

    return res.status(200).json({ success: true });
  } catch (error) {
    throwError(error, res);
  }
};
