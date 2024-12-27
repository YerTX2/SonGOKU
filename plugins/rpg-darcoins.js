import MessageType from '@whiskeysockets/baileys';

let impuesto = 0.02;
let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0];
    else who = m.chat;

    if (!who) throw '🚩 Menciona al usuario con *@user.*';

    let txt = text.replace('@' + who.split`@`[0], '').trim();
    if (!txt) throw '🚩 Ingrese la cantidad de *⚡ ki* que quiere transferir.';
    if (isNaN(txt)) throw '🚩 Sólo números.';

    let poin = parseInt(txt);
    if (poin < 1) throw '🚩 La cantidad mínima a transferir es *1 ⚡ ki*.';

    let imt = Math.ceil(poin * impuesto);
    let totalCost = poin + imt;

    let users = global.db.data.users;

    // Verificar si el usuario que transfiere tiene suficientes recursos
    if (totalCost > users[m.sender].limit) {
        throw `🚩 No tienes suficientes *⚡ ki* para transferir. Necesitas al menos *${totalCost} ⚡ ki* (incluyendo impuesto).`;
    }

    // Verificar si el destinatario existe en la base de datos
    if (!users[who]) {
        throw '🚩 El usuario mencionado no existe en la base de datos.';
    }

    // Realizar la transferencia
    users[m.sender].limit -= totalCost;
    users[who].limit += poin;

    // Responder al usuario
    await m.reply(`Has transferido *${poin} ⚡ ki* a *@${who.split`@`[0]}*
Impuesto (2%): *${imt} ⚡ ki*
Total gastado: *${totalCost} ⚡ ki*`);

    conn.fakeReply(m.chat, `*+${poin}* ⚡ ki`, who, m.text);
};

handler.help = ['darstars *@user <cantidad>*'];
handler.tags = ['rpg'];
handler.command = ['darki', 'darstars'];
handler.register = true;

export default handler;