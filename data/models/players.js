const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  isAvailable: Boolean
});

module.exports = mongoose.model('Player', playerSchema);