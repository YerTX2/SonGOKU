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
    let imt = Math.ceil(poin * impuesto); 
    let totalCost = poin + imt; 

    if (poin < 1) throw '🚩 La cantidad mínima a transferir es *1 ⚡ ki*.';

    let users = global.db.data.users;

    
    if (totalCost > users[m.sender].limit) {
        throw `🚩 No tienes suficientes *⚡ ki* para transferir. Necesitas al menos *${totalCost} ⚡ ki* (incluyendo impuesto).`;
    }

    
    if (!users[who]) {
        throw '🚩 El usuario mencionado no existe en la base de datos.';
    }

    
    users[m.sender].limit -= totalCost; // Restar al remitente el total (cantidad + impuesto)
    users[who].limit += poin; // Sumar la cantidad transferida al destinatario

    
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