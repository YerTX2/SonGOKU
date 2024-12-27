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
    let imt = Math.ceil(poin * impuesto); // Impuesto calculado
    let totalCost = poin + imt; // Total a descontar del remitente

    if (totalCost < 1) throw '🚩 La cantidad mínima a transferir es *1 ⚡ ki*.';

    let users = global.db.data.users;

    // Verificar si el remitente tiene suficientes recursos
    if (totalCost > users[m.sender].limit) {
        throw `🚩 No tienes suficientes *⚡ ki* para transferir. Necesitas al menos *${totalCost} ⚡ ki* (incluyendo impuesto).`;
    }

    // Realizar la transferencia
    users[m.sender].limit -= totalCost; // Restar el total (incluido el impuesto) al remitente
    users[who].limit += poin; // Sumar los puntos transferidos al destinatario

    // Responder al usuario
    await m.reply(`Has transferido *${poin} ⚡ ki* a *@${who.split`@`[0]}*
Impuesto (2%): *${imt} ⚡ ki*
Total gastado: *${totalCost} ⚡ ki*`);

    conn.fakeReply(m.chat, `*+${poin}* ⚡ ki recibidos.`, who, m.text);
};

handler.help = ['darstars *@user <cantidad>*'];
handler.tags = ['rpg'];
handler.command = ['darki', 'darstars'];
handler.register = true;

export default handler;