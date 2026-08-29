const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  stripeCustomerId: { type: String },
  membershipStatus: { type: String, enum: ['Active', 'Inactive', 'Pending'], default: 'Inactive' },
  membershipExpiryDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Member', memberSchema);
