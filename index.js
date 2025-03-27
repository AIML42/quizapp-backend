require('dotenv').config();
const connectDB = require('./db/connection');

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const GameSession = require('./models/GameSession');
const Question = require('./models/Question');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://render-quizapp.netlify.app'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://render-quizapp.netlify.app'],
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

// Routes
const gameRoutes = require('./routes/gameRoutes');
app.use('/api', gameRoutes);

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-game', async ({ gameId, playerId }) => {
    try {
      // Fetch the updated game session
      const gameSession = await GameSession.findOne({ gameId });
      if (!gameSession) {
        socket.emit('error', { message: 'Game not found' });
        return;
      }

      // Find the player who just joined
      const player = gameSession.players.find((p) => p.playerId === playerId);
      if (!player) {
        socket.emit('error', { message: 'Player not found' });
        return;
      }

      // Allow rejoining if the game is in 'starting' state and the player is already in the game
      if (gameSession.status !== 'waiting' && gameSession.status !== 'starting') {
        socket.emit('error', { message: 'Game already started or finished' });
        return;
      }

      // Join the game room
      socket.join(gameId);

      // Broadcast to all players in the room
      io.to(gameId).emit('player-joined', {
        player,
        players: gameSession.players,
      });

      // Check if the game room is full and hasn't started yet
      if (gameSession.players.length === gameSession.totalPlayers && gameSession.status === 'waiting') {
        // Update the status to prevent multiple triggers
        gameSession.status = 'starting';
        await gameSession.save();

        io.to(gameId).emit('game-starting', { message: 'Game starting in 5 seconds!' });

        setTimeout(async () => {
          gameSession.status = 'active';
          await gameSession.save();
          io.to(gameId).emit('start-game', { game: gameSession });

          // Start the first round
          await startRound(gameId);
        }, 5000);
      }
    } catch (error) {
      socket.emit('error', { message: 'Error joining game', error: error.message });
    }
  });

  socket.on('submit-answer', async ({ gameId, playerId, answer }) => {
    try {
      const gameSession = await GameSession.findOne({ gameId });
      if (!gameSession || gameSession.status !== 'active') {
        socket.emit('error', { message: 'Game not active' });
        return;
      }

      // Add the answer to the game session
      gameSession.answers.push({ playerId, answer, timestamp: new Date() });
      await gameSession.save();

      // Check if all players have answered
      const playersAnswered = new Set(gameSession.answers.map((a) => a.playerId));
      if (playersAnswered.size === gameSession.players.length) {
        await endRound(gameId);
      }
    } catch (error) {
      socket.emit('error', { message: 'Error submitting answer', error: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Helper function to start a round
const startRound = async (gameId) => {
  try {
    const gameSession = await GameSession.findOne({ gameId });
    if (!gameSession || gameSession.status !== 'active') {
      return;
    }

    // Fetch a random question
    const query = gameSession.category ? { category: gameSession.category } : {};
    const questionsCount = await Question.countDocuments(query);
    if (questionsCount === 0) {
      io.to(gameId).emit('error', { message: 'No questions available' });
      return;
    }

    const randomIndex = Math.floor(Math.random() * questionsCount);
    const randomQuestion = await Question.findOne(query).skip(randomIndex);

    gameSession.currentQuestion = randomQuestion._id;
    gameSession.answers = []; // Reset answers for the new round
    await gameSession.save();

    io.to(gameId).emit('new-round', {
      round: gameSession.currentRound,
      question: {
        text: randomQuestion.text,
        options: randomQuestion.options,
      },
    });
  } catch (error) {
    io.to(gameId).emit('error', { message: 'Error starting round', error: error.message });
  }
};

// Helper function to end a round
// In index.js, inside the endRound function
const endRound = async (gameId) => {
  try {
    console.log(`Ending round for gameId: ${gameId}`);
    const gameSession = await GameSession.findOne({ gameId });
    if (!gameSession) {
      console.log(`Game session not found for gameId: ${gameId}`);
      io.to(gameId).emit('error', { message: 'Game session not found' });
      return;
    }
    if (gameSession.status !== 'active') {
      console.log(`Game not active: status=${gameSession.status}, gameId=${gameId}`);
      return;
    }

    await gameSession.populate('currentQuestion');
    if (!gameSession.currentQuestion) {
      console.log(`Current question not found for gameId: ${gameId}`);
      io.to(gameId).emit('error', { message: 'Current question not found' });
      return;
    }

    const correctAnswer = gameSession.currentQuestion.correctAnswer;
    const correctAnswers = gameSession.answers
      .filter((a) => a.answer === correctAnswer)
      .sort((a, b) => a.timestamp - b.timestamp);
    console.log(`Correct answers for gameId: ${gameId}:`, correctAnswers);

    let winner = null;
    if (correctAnswers.length > 0) {
      const winnerAnswer = correctAnswers[0];
      winner = gameSession.players.find((p) => p.playerId === winnerAnswer.playerId);
      if (winner) {
        winner.score += 10;
        console.log(`Winner for gameId: ${gameId}: ${winner.name}, new score: ${winner.score}`);
      } else {
        console.log(`Winner not found in players for gameId: ${gameId}, winnerAnswer:`, winnerAnswer);
      }
    } else {
      console.log(`No correct answers for gameId: ${gameId}`);
    }

    // Get the list of player IDs who have answered
    const answeredPlayers = Array.from(new Set(gameSession.answers.map((a) => a.playerId)));

    io.to(gameId).emit('round-end', {
      correctAnswer,
      winner: winner ? { playerId: winner.playerId, name: winner.name } : null,
      players: gameSession.players,
      answeredPlayers, // Add this to the event data
    });
    console.log(`Emitted round-end for gameId: ${gameId}, correctAnswer: ${correctAnswer}, winner:`, winner);

    gameSession.currentRound += 1;
    console.log(`Incremented round for gameId: ${gameId}, new round: ${gameSession.currentRound}`);
    if (gameSession.currentRound > gameSession.totalRounds) {
      gameSession.status = 'finished';
      await gameSession.save();
      console.log(`Game finished for gameId: ${gameId}`);

      io.to(gameId).emit('game-end', {
        finalScores: gameSession.players,
      });
      console.log(`Emitted game-end for gameId: ${gameId}`);

      await GameSession.deleteOne({ gameId });
      io.to(gameId).emit('session-deleted', { message: 'Game session has been deleted' });
      console.log(`Emitted session-deleted for gameId: ${gameId}`);
    } else {
      await gameSession.save();
      console.log(`Scheduling next round for gameId: ${gameId} in 3 seconds`);
      setTimeout(async () => {
        console.log(`Executing scheduled startRound for gameId: ${gameId}`);
        await startRound(gameId);
      }, 3000);
    }
  } catch (error) {
    console.error(`Error ending round for gameId: ${gameId}:`, error);
    io.to(gameId).emit('error', { message: 'Error ending round', error: error.message });
  }
};

// Start server
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log('Server is running at', port);
});