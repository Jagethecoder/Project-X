
const mongoose = require('mongoose');

const callSessionSchema = new mongoose.Schema({
  caller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startedAt: Date,
  endedAt: Date,
  status: String
}, { timestamps: true });

module.exports = mongoose.model('CallSession', callSessionSchema);
