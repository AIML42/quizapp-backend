const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
  gameId: { type: String, required: true, unique: true },
  host: { type: String, required: true },
  category: { type: String },
  totalPlayers: { type: Number, required: true },
  players: [
    {
      playerId: String,
      name: String,
      score: { type: Number, default: 0 },
    },
  ],
  currentRound: { type: Number, default: 1 },
  totalRounds: { type: Number, default: 5 },
  currentQuestion: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  answers: [
    {
      playerId: String,
      answer: String,
      timestamp: Date,
    },
  ],
  status: { type: String, default: 'waiting' },
});

module.exports = mongoose.model('GameSession', gameSessionSchema);