const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  label: { type: String, required: true, unique: true },  // Fixed 'unique_tru' to 'unique: true'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Badge', badgeSchema);
