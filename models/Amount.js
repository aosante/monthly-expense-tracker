/**
 * This collectio will contain the montly amount, limit
 * or budget that the user will have
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmountSchema = new Schema({
  amount: {
    type: Number,
    required: [true, 'Please add monthly budget or limit'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('Amount', AmountSchema);
