let games = {};

let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
  const chatId = m.chat;

  if (!games[chatId]) {
    if (text.includes('|')) {
      const [player1, player2] = text.split('|').map((id) => id.trim().replace('@', '') + '@s.whatsapp.net');
      if (!participants.some((p) => p.id === player1) || !participants.some((p) => p.id === player2)) {
        return conn.reply(m.chat, 'Ambos jugadores deben estar en el grupo.', m);
      }
      games[chatId] = {
        board: Array(9).fill(' '),
        turn: player1,
        players: { X: player1, O: player2 },
      };
      const board = renderBoard(games[chatId].board);
      return conn.reply(m.chat, `🎮 Tateti 🎮\n\n${board}\nTurno de: @${player1.split('@')[0]} (X)`, m, {
        mentions: [player1],
      });
    } else {
      return conn.reply(m.chat, `Usa: ${usedPrefix + command} @jugador1 | @jugador2`, m);
    }
  }

  const currentGame = games[chatId];
  if (!currentGame.players.X || !currentGame.players.O) {
    delete games[chatId];
    return conn.reply(m.chat, 'El juego ha sido reiniciado.', m);
  }

  if (!text || isNaN(text) || +text < 1 || +text > 9 || currentGame.board[+text - 1] !== ' ') {
    return conn.reply(m.chat, 'Elige un número válido entre 1 y 9 que no esté ocupado.', m);
  }

  if (m.sender !== currentGame.turn) {
    return conn.reply(m.chat, `Es el turno de @${currentGame.turn.split('@')[0]}.`, m, {
      mentions: [currentGame.turn],
    });
  }

  const symbol = currentGame.turn === currentGame.players.X ? 'X' : 'O';
  currentGame.board[+text - 1] = symbol;
  const board = renderBoard(currentGame.board);

  const winner = checkWinner(currentGame.board);
  if (winner) {
    conn.reply(m.chat, `🎉 ¡Ganador! @${currentGame.players[winner].split('@')[0]} (${winner})\n\n${board}`, m, {
      mentions: [currentGame.players[winner]],
    });
    delete games[chatId];
    return;
  }

  if (currentGame.board.every((cell) => cell !== ' ')) {
    conn.reply(m.chat, `🤝 ¡Empate!\n\n${board}`, m);
    delete games[chatId];
    return;
  }

  currentGame.turn = currentGame.turn === currentGame.players.X ? currentGame.players.O : currentGame.players.X;
  conn.reply(m.chat, `${board}\nTurno de: @${currentGame.turn.split('@')[0]} (${currentGame.turn === currentGame.players.X ? 'X' : 'O'})`, m, {
    mentions: [currentGame.turn],
  });
};

const renderBoard = (board) => {
  return board.map((cell, i) => (cell === ' ' ? i + 1 : cell)).join('|').replace(/(.{5})/g, '$1\n');
};

const checkWinner = (board) => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of winPatterns) {
    if (board[a] !== ' ' && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

handler.command = ['tateti'];
handler.help = ['tateti @jugador1 | @jugador2'];
handler.tags = ['games'];

export default handler;