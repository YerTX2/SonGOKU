let cooldowns = {};

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let tiempoEspera = 15; // Cooldown en segundos
    let users = global.db.data.users[m.sender];
    let apuesta = parseInt(args[0]);

    if (!args[0]) return m.reply(`🌀 Ingresa la cantidad de *⚡ Ki* que deseas apostar.\n\n\`Ejemplo:\`\n> *${usedPrefix + command}* 10`);
    if (isNaN(args[0])) return m.reply(`🚩 Ingresa un número válido.\n\n\`Ejemplo:\`\n> *${usedPrefix + command}* 10`);
    if (apuesta < 1) return m.reply(`🚩 La apuesta mínima es *1 ⚡ Ki*.`);
    if (apuesta > users.limit) return m.reply(`🚩 No tienes suficientes *⚡ Ki*. Tienes actualmente *${users.limit} ⚡ Ki* disponibles.`);

    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
        let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
        return m.reply(`⏱ Espera *${tiempoRestante}* para apostar nuevamente.`);
    }

    let emojis = ["🐉", "🌟", "💰", "🍀", "🎲", "🔥", "⚡"];
    let slots = Array.from({ length: 3 }, () => emojis[Math.floor(Math.random() * emojis.length)]);

    let resultado;
    if (slots[0] === slots[1] && slots[1] === slots[2]) {
        let multiplicador = Math.floor(Math.random() * 4) + 2; // Gana entre 2x y 5x la apuesta
        let ganancia = apuesta * multiplicador;
        resultado = `🎉 ¡Jackpot! Has ganado *${ganancia} ⚡ Ki* con un multiplicador de *${multiplicador}x*!`;
        users.limit += ganancia;
    } else if (slots[0] === slots[1] || slots[1] === slots[2] || slots[0] === slots[2]) {
        let ganancia = Math.floor(apuesta * 1.5); // Gana 1.5x de la apuesta
        resultado = `😮 ¡Casi! Has ganado *${ganancia} ⚡ Ki*. ¡Sigue intentando!`;
        users.limit += ganancia;
    } else {
        let perdida = Math.random() > 0.3 ? apuesta : Math.floor(apuesta / 2); // Posibilidad de perder menos
        resultado = perdida === apuesta 
            ? `😔 Perdiste *${apuesta} ⚡ Ki*. ¡Mejor suerte la próxima vez!` 
            : `🤔 Perdiste *${apuesta} ⚡ Ki*, pero recuperaste *${Math.floor(apuesta / 2)} ⚡ Ki*. ¡No te desanimes!`;
        users.limit -= perdida;
    }

    cooldowns[m.sender] = Date.now();

    return await conn.reply(
        m.chat,
        `
🎰 | *SLOTS* 
──────────
${slots[0]} : ${slots[1]} : ${slots[2]}
────────── 

${resultado}`,
        m
    );
};

handler.help = ['slot <apuesta>'];
handler.tags = ['game', 'rpg'];
handler.command = ['slot'];
handler.register = true;
handler.group = false;
export default handler;

function segundosAHMS(segundos) {
    let minutos = Math.floor(segundos / 60);
    let restoSegundos = segundos % 60;
    return minutos > 0 ? `${minutos}m ${restoSegundos}s` : `${restoSegundos}s`;
}