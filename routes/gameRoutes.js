const express = require('express');
const router  = express.Router();
const { createGame, joinGame, getRandomQuestion } = require('../controllers/gameController');

// POST /api/game/create - Create a new game room
router.post('/create', createGame);

// POST /api/game/join - Join an existing game room
router.post('/join', joinGame);

// GET /api/questions/random - Get a random question
router.get('/questions/random', getRandomQuestion);

module.exports = router;