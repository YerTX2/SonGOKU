let handler = async (m, { conn, isOwner }) => {
    if (!isOwner) {
        return m.reply('❌ Este comando solo está disponible para los propietarios.');
    }

    let users = global.db.data.users;
    if (users[m.sender]) {
        users[m.sender].limit = Infinity;
        await m.reply('¡Ahora tienes *KI infinito*! 🎉');
    } else {
        await m.reply('❌ No se pudo encontrar al usuario en la base de datos.');
    }
};

handler.help = ['chetarki'];
handler.tags = ['rpg'];
handler.command = ['chetarki'];
handler.register = true;
handler.owner = true;

export default handler;
