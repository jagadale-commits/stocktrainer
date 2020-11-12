const { model, Schema } = require('mongoose');

const stockSchema = new Schema({
  username: String,
  createdAt: String,
  closingPrice: [Number],
  prediction: [Number],
  decisions: [Number],
  correct: [Number],
  timestamp1: [String],
  timestamp2: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Stock', stockSchema);
