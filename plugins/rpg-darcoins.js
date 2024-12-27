import MessageType from '@whiskeysockets/baileys';

let impuesto = 0.02;

let handler = async (m, { conn, text }) => {
    let who = m.isGroup ? m.mentionedJid[0] : m.chat;

    if (!who) throw '🚩 Menciona al usuario con *@user.*';

    let txt = text.replace('@' + who.split`@`[0], '').trim();
    if (!txt) throw '🚩 Ingresa la cantidad de *⚡ ki* que quieres transferir.';
    if (isNaN(txt)) throw '🚩 Ingresa solo números.';

    let poin = parseInt(txt);
    let imt = Math.ceil(poin * impuesto);
    let totalCost = poin + imt;

    if (poin < 1) throw '🚩 La cantidad mínima a transferir es *1 ⚡ ki*.';

    let users = global.db.data.users;

    if (!users[who]) throw '🚩 El usuario mencionado no existe en la base de datos.';
    if (totalCost > users[m.sender].limit) throw `🚩 No tienes suficientes *⚡ ki*. Necesitas al menos *${totalCost} ⚡ ki* (incluyendo impuesto).`;

    users[m.sender].limit -= totalCost;
    users[who].limit += poin;

    await conn.reply(
        m.chat,
        `Has transferido *${poin} ⚡ ki* a *@${who.split`@`[0]}*
Impuesto (2%): *${imt} ⚡ ki*
Total gastado: *${totalCost} ⚡ ki*`,
        m
    );

    await conn.reply(
        who,
        `*+${poin}* ⚡ ki recibidos de *@${m.sender.split`@`[0]}*.`,
        m
    );
};

handler.help = ['darstars *@user <cantidad>*'];
handler.tags = ['rpg'];
handler.command = ['darki', 'darstars'];
handler.register = true;

export default handler;