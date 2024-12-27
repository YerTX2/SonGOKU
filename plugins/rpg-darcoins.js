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

    let poin = parseInt(txt); // Cantidad a transferir
    let imt = Math.ceil(poin * impuesto); // Cálculo del impuesto (2%)
    let totalCost = poin + imt; // Total que debe pagar el remitente

    if (poin < 1) throw '🚩 La cantidad mínima a transferir es *1 ⚡ ki*.';

    let users = global.db.data.users;

    // Verificar si el remitente tiene suficientes ⚡ ki
    if (totalCost > users[m.sender].limit) {
        throw `🚩 No tienes suficientes *⚡ ki* para transferir. Necesitas al menos *${totalCost} ⚡ ki* (incluyendo impuesto).`;
    }

    // Verificar si el destinatario existe
    if (!users[who]) {
        throw '🚩 El usuario mencionado no existe en la base de datos.';
    }

    // Realizar la transferencia
    users[m.sender].limit -= totalCost; // Restar al remitente el total (cantidad + impuesto)
    users[who].limit += poin; // Sumar la cantidad transferida al destinatario

    // Respuesta al remitente
    await m.reply(`Has transferido *${poin} ⚡ ki* a *@${who.split`@`[0]}*
Impuesto (2%): *${imt} ⚡ ki*
Total gastado: *${totalCost} ⚡ ki*`);

    // Notificación al destinatario
    conn.fakeReply(m.chat, `*+${poin}* ⚡ ki recibidos.`, who, m.text);
};

handler.help = ['darstars *@user <cantidad>*'];
handler.tags = ['rpg'];
handler.command = ['darki', 'darstars'];
handler.register = true;

export default handler;