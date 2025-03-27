const GameSession = require('../models/GameSession');

// Generate a random game ID
const generateGameId = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase(); // e.g., "ABC123"
};

// Create a new game room
const createGame = async (req, res) => {
  const { playerName, category, totalPlayers } = req.body;

  // Validate required fields
  if (!playerName || !totalPlayers) {
    return res.status(400).json({ message: 'Missing required fields: playerName and totalPlayers' });
  }

  // Validate totalPlayers (optional, based on your requirements)
  if (totalPlayers < 2 || totalPlayers > 5) {
    return res.status(400).json({ message: 'totalPlayers must be between 2 and 5' });
  }

  try {
    const gameId = generateGameId();
    const gameSession = new GameSession({
      gameId,
      host: playerName,
      category,
      totalPlayers,
      players: [{ playerId: `player-${Date.now()}`, name: playerName, score: 0 }],
    });

    await gameSession.save();
    res.status(201).json({ gameId, playerId: gameSession.players[0].playerId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating game', error: error.message });
  }
};


// Join an existing game room
const joinGame = async (req, res) => {
    const { gameId, playerName } = req.body;
  
    if (!gameId || !playerName) {
      return res.status(400).json({ message: 'Missing required fields: gameId and playerName' });
    }
  
    try {
      const gameSession = await GameSession.findOne({ gameId });
      if (!gameSession) {
        return res.status(404).json({ message: 'Game not found' });
      }
  
      if (gameSession.status !== 'waiting') {
        return res.status(400).json({ message: 'Game already started or finished' });
      }
  
      if (gameSession.players.length >= gameSession.totalPlayers) {
        return res.status(400).json({ message: 'Game room is full' });
      }
  
      if (gameSession.players.some((player) => player.name === playerName)) {
        return res.status(400).json({ message: 'Player name already taken' });
      }
  
      const playerId = `player-${Date.now()}`;
      gameSession.players.push({ playerId, name: playerName, score: 0 });
      await gameSession.save();
  
      res.status(200).json({ playerId, game: gameSession });
    } catch (error) {
      res.status(500).json({ message: 'Error joining game', error: error.message });
    }
  };


// Get a random question for the game
const getRandomQuestion = async (req, res) => {
  const { gameId } = req.query;

  if (!gameId) {
    return res.status(400).json({ message: 'Missing required query parameter: gameId' });
  }

  try {
    const gameSession = await GameSession.findOne({ gameId });
    if (!gameSession) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const query = gameSession.category ? { category: gameSession.category } : {};
    const questionsCount = await Question.countDocuments(query);
    if (questionsCount === 0) {
      return res.status(404).json({ message: 'No questions found for this category' });
    }

    const randomIndex = Math.floor(Math.random() * questionsCount);
    const randomQuestion = await Question.findOne(query).skip(randomIndex);

    res.status(200).json(randomQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question', error: error.message });
  }
};

module.exports = { createGame, joinGame, getRandomQuestion };