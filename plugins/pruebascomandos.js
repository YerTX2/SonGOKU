const { WAConnection, MessageType } = require('@adiwajshing/baileys');

// Crear una conexión a WhatsApp
const conn = new WAConnection();

conn.on('open', () => {
    console.log('¡Conexión exitosa con WhatsApp!');
});

// Escuchar mensajes entrantes
conn.on('chat-update', async (chat) => {
    if (!chat.messages) return;
    const message = chat.messages.all()[0];
    const messageType = Object.keys(message.message)[0];

    if (messageType === 'conversation' || messageType === 'extendedTextMessage') {
        const text = message.message.conversation || message.message.extendedTextMessage.text;
        const from = message.key.remoteJid;

        // Comando: !top1
        if (text.startsWith('!top1')) {
            const players = [
                { name: 'Jugador1', score: 2500 },
                { name: 'Jugador2', score: 2000 },
                { name: 'Jugador3', score: 1800 },
            ];

            let topMessage = '*Top de Jugadores:*\n';
            players.forEach((player, index) => {
                topMessage += `${index + 1}. ${player.name} - ${player.score} puntos\n`;
            });

            await conn.sendMessage(from, topMessage, MessageType.text);
        }

        // Comando: !yea
        if (text.startsWith('!yea')) {
            const response = '¡Yea! Todo está funcionando correctamente.';
            await conn.sendMessage(from, response, MessageType.text);
        }
    }
});

// Conectar
(async () => {
    await conn.connect();
})();
