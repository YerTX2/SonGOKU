let games = {};

let handler = async (m, { conn, text, command }) => {
  const chatId = m.chat;

  if (command === 'leavetateti') {
    if (games[chatId] && games[chatId].waiting && games[chatId].player1 === m.sender) {
      delete games[chatId];
      return conn.reply(m.chat, 'Has salido del juego de Tateti.', m);
    } else {
      return conn.reply(m.chat, 'No tienes un juego activo del que puedas salir.', m);
    }
  }

  if (!games[chatId]) {
    const msg = await conn.reply(
      m.chat,
      '🎮 *Tateti* 🎮\n\nEsperando otro jugador. Responde a este mensaje con: *jugartateti* para unirte. Si quieres salir, usa el comando *.leavetateti*.',
      m
    );
    games[chatId] = {
      waiting: true,
      player1: m.sender,
      messageId: msg.key.id,
    };
    return;
  }

  const currentGame = games[chatId];

  if (currentGame.waiting) {
    if (m.quoted && m.quoted.id === currentGame.messageId && text.toLowerCase() === 'jugartateti' && m.sender !== currentGame.player1) {
      currentGame.player2 = m.sender;
      currentGame.waiting = false;
      currentGame.board = Array(9).fill(' ');
      currentGame.turn = currentGame.player1;
      return conn.reply(
        m.chat,
        `🎮 *Tateti* 🎮\n\n¡El juego comienza!\n\nTurno de @${currentGame.turn.split('@')[0]} (X).\n${renderBoard(currentGame.board)}`,
        m,
        { mentions: [currentGame.player1, currentGame.player2] }
      );
    } else if (m.sender === currentGame.player1) {
      return conn.reply(m.chat, 'Estás esperando a que otro jugador se una.', m);
    } else {
      return conn.reply(m.chat, 'Responde correctamente al mensaje para unirte al juego.', m);
    }
  }

  if (!text || isNaN(text) || +text < 1 || +text > 9 || currentGame.board[+text - 1] !== ' ') {
    return conn.reply(m.chat, 'Elige un número válido entre 1 y 9 que no esté ocupado.', m);
  }

  if (m.sender !== currentGame.turn) {
    return conn.reply(m.chat, `Es el turno de @${currentGame.turn.split('@')[0]}.`, m, {
      mentions: [currentGame.turn],
    });
  }

  const symbol = currentGame.turn === currentGame.player1 ? 'X' : 'O';
  currentGame.board[+text - 1] = symbol;
  const board = renderBoard(currentGame.board);

  const winner = checkWinner(currentGame.board);
  if (winner) {
    conn.reply(
      m.chat,
      `🎉 ¡Ganador! @${currentGame[winner === 'X' ? 'player1' : 'player2'].split('@')[0]} (${winner})\n\n${board}`,
      m,
      { mentions: [currentGame.player1, currentGame.player2] }
    );
    delete games[chatId];
    return;
  }

  if (currentGame.board.every((cell) => cell !== ' ')) {
    conn.reply(m.chat, `🤝 ¡Empate!\n\n${board}`, m);
    delete games[chatId];
    return;
  }

  currentGame.turn = currentGame.turn === currentGame.player1 ? currentGame.player2 : currentGame.player1;
  conn.reply(m.chat, `${board}\nTurno de: @${currentGame.turn.split('@')[0]} (${currentGame.turn === currentGame.player1 ? 'X' : 'O'})`, m, {
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

handler.command = ['tateti', 'leavetateti'];
handler.help = ['tateti', 'leavetateti'];
handler.tags = ['games'];

export default handler;