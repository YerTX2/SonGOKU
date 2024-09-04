import fetch from 'node-fetch';

let emailGuardado = null;

let handler = async (m, { conn, text, args }) => {

    if (!emailGuardado) {
        await m.reply('Primero genera un correo usando el comando getemail.');
        return;
    }

    let correo = emailGuardado;
    let url = `https://api.cafirexos.com/api/tempmail/getmessages?mail=${correo}`;

    try {
        let response = await fetch(url);
        let json = await response.json();

        if (json.length === 0) {
            await m.reply('No hay mensajes en este momento.');
        } else {
            let mensajes = json.map(msg => `De: ${msg.sender}\nAsunto: ${msg.subject}\nMensaje: ${msg.body}`).join('\n\n');
            await m.reply(mensajes);
        }
    } catch (error) {
        await m.reply('Error obteniendo los mensajes: ' + error.message);
    }
};

handler.help = ['getmessage'];
handler.tags = ['tools'];
handler.command = ['getmessage'];
handler.register = true;

export default handler;