const io = require('socket.io-client');

// Simulate Player 1 (Test)
const socket1 = io('http://localhost:4000');
socket1.on('connect', () => {
  console.log('Player 1 connected:', socket1.id);
  socket1.emit('join-game', { gameId: 'CDJ9X0', playerId: 'player-1742997619021' });
});

socket1.on('player-joined', (data) => {
  console.log('Player 1 received player-joined:', data);
});

socket1.on('game-starting', (data) => {
  console.log('Player 1 received game-starting:', data);
});

socket1.on('start-game', (data) => {
  console.log('Player 1 received start-game:', data);
});

socket1.on('new-round', (data) => {
  console.log('Player 1 received new-round:', data);
  setTimeout(() => {
    socket1.emit('submit-answer', {
      gameId: 'CDJ9X0',
      playerId: 'player-1742997619021',
      answer: data.question.options[0], // Pick the first option
    });
  }, 1000);
});

socket1.on('round-end', (data) => {
  console.log('Player 1 received round-end:', data);
});

socket1.on('game-end', (data) => {
  console.log('Player 1 received game-end:', data);
});

socket1.on('session-deleted', (data) => {
  console.log('Player 1 received session-deleted:', data);
});

socket1.on('error', (data) => {
  console.log('Player 1 received error:', data);
});

// Simulate Player 2 (Loka)
const socket2 = io('http://localhost:4000');
socket2.on('connect', () => {
  console.log('Player 2 connected:', socket2.id);
  setTimeout(() => {
    socket2.emit('join-game', { gameId: 'CDJ9X0', playerId: 'player-1742997720214' });
  }, 1000);
});

socket2.on('player-joined', (data) => {
  console.log('Player 2 received player-joined:', data);
});

socket2.on('game-starting', (data) => {
  console.log('Player 2 received game-starting:', data);
});

socket2.on('start-game', (data) => {
  console.log('Player 2 received start-game:', data);
});

socket2.on('new-round', (data) => {
  console.log('Player 2 received new-round:', data);
  setTimeout(() => {
    socket2.emit('submit-answer', {
      gameId: 'CDJ9X0',
      playerId: 'player-1742997720214',
      answer: data.question.options[1], // Pick the second option
    });
  }, 1500);
});

socket2.on('round-end', (data) => {
  console.log('Player 2 received round-end:', data);
});

socket2.on('game-end', (data) => {
  console.log('Player 2 received game-end:', data);
});

socket2.on('session-deleted', (data) => {
  console.log('Player 2 received session-deleted:', data);
});

socket2.on('error', (data) => {
  console.log('Player 2 received error:', data);
});

// Simulate Player 3 (Buka)
const socket3 = io('http://localhost:4000');
socket3.on('connect', () => {
  console.log('Player 3 connected:', socket3.id);
  setTimeout(() => {
    socket3.emit('join-game', { gameId: 'CDJ9X0', playerId: 'player-1742997963888' });
  }, 2000);
});

socket3.on('player-joined', (data) => {
  console.log('Player 3 received player-joined:', data);
});

socket3.on('game-starting', (data) => {
  console.log('Player 3 received game-starting:', data);
});

socket3.on('start-game', (data) => {
  console.log('Player 3 received start-game:', data);
});

socket3.on('new-round', (data) => {
  console.log('Player 3 received new-round:', data);
  setTimeout(() => {
    socket3.emit('submit-answer', {
      gameId: 'CDJ9X0',
      playerId: 'player-1742997963888',
      answer: data.question.options[2], // Pick the third option
    });
  }, 2000);
});

socket3.on('round-end', (data) => {
  console.log('Player 3 received round-end:', data);
});

socket3.on('game-end', (data) => {
  console.log('Player 3 received game-end:', data);
});

socket3.on('session-deleted', (data) => {
  console.log('Player 3 received session-deleted:', data);
});

socket3.on('error', (data) => {
  console.log('Player 3 received error:', data);
});