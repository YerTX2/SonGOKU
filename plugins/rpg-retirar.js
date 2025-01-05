let handler = async (m, { args }) => {
    let user = global.db.data.users[m.sender];
    if (!args[0]) return m.reply('🚩 Ingresa la cantidad de *KI ⚡* que deseas retirar.');
    if (args[0].toLowerCase() === 'all') {
        if (user.bank < 1) return m.reply('🚩 No tienes *KI ⚡* en el Banco para retirar.');
        let count = user.bank;
        user.bank = 0;
        user.limit += count;
        await m.reply(`🚩 Retiraste *${count} KI ⚡* del Banco.`);
        return !0;
    }
    if (isNaN(args[0]) || Number(args[0]) < 1) {
        return m.reply('🚩 Ingresa una cantidad válida de *KI ⚡*.');
    }
    let count = parseInt(args[0]);
    if (user.bank < count) return m.reply(`🚩 Solo tienes *${user.bank} KI ⚡* en el Banco.`);
    user.bank -= count;
    user.limit += count;
    await m.reply(`🚩 Retiraste *${count} KI ⚡* del Banco.`);
};

handler.help = ['retirar'];
handler.tags = ['rpg'];
handler.command = ['withdraw', 'retirar', 'wd'];
handler.register = true;
export default handler;