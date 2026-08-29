const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  stripePaymentIntentId: { type: String, required: true, unique: true },
  status: { type: String, default: 'succeeded' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema);
