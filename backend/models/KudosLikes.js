const mongoose = require('mongoose');

const kudosLikesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  kudosId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kudos', required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('KudosLikes', kudosLikesSchema);
