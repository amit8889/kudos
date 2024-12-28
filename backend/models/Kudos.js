const mongoose = require('mongoose');

const kudosSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  badge:{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge', required: true },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Kudos', kudosSchema);
