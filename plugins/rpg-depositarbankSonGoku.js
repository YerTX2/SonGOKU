let handler = async (m, { args }) => {
    let user = global.db.data.users[m.sender];
    if (!args[0]) return m.reply('🚩 Ingresa la cantidad de *⚡ Ki* que deseas depositar.');

    if (args[0].toLowerCase() === 'all') { 

        if (user.limit < 1) return m.reply('🚩 No tienes *⚡ Ki* para depositar.');
        let count = user.limit; 
        user.limit = 0;
        user.bank += count;
        await m.reply(`Depositaste *${count} ⚡ Ki* al Banco.`);
        return !0;
    }

    if (isNaN(args[0]) || Number(args[0]) < 1) { 
        return m.reply('🚩 Ingresa una cantidad válida de *⚡ Ki*.');
    }

    let count = parseInt(args[0]);
    if (user.limit < count) return m.reply(`🚩 Solo tienes *${user.limit} ⚡ Ki* en la Cartera.`);
    
    user.limit -= count;
    user.bank += count;
    await m.reply(`Depositaste *${count} ⚡ Ki* al Banco.`);
};

handler.help = ['depositar'];
handler.tags = ['rpg'];
handler.command = ['deposit', 'depositar', 'dep', 'd'];
handler.register = true;
export default handler;