export async function before(m) {
  if (m.text && global.prefix.test(m.text)) {
    
    const usedPrefix = global.prefix.exec(m.text)[0];
    const [command] = m.text.slice(usedPrefix.length).trim().split(' ').map(c => c.toLowerCase());

    const esComandoValido = (cmd, plugins) => Object.values(plugins).some(plugin => {
      const comandos = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
      return comandos.includes(cmd);
    });

    if (esComandoValido(command, global.plugins)) {
      let { chats, users } = global.db.data;
      let chat = chats[m.chat];
      let user = users[m.sender];

      if (!chat.isBanned) {
        user.commands = (user.commands || 0) + 1;
        await conn.sendPresenceUpdate('composing', m.chat);
      }
    } else {
      const comando = m.text.trim().split(' ')[0];
      await m.reply(`El comando *"${comando}"* no es válido.\nUsa ".menu" para ver los comandos disponibles.`);
    }
  }
}