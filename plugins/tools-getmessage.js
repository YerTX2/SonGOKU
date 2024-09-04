import fetch from 'node-fetch';

let handler = async (m, { conn, text, args }) => {

    let correo = args[0]; 

    if (!correo) {
        await m.reply('Por favor, proporciona el correo electrónico generado con el comando getemail.');
        return;
    }

    let url = `https://api.cafirexos.com/api/tempmail/getmessages?mail=${correo}`;

    try {
        let response = await fetch(url);
        let json = await response.json();

        if (Array.isArray(json) && json.length > 0) {
            let mensajes = json.map(msg => `De: ${msg.sender}\nAsunto: ${msg.subject}\nMensaje: ${msg.body}`).join('\n\n');
            await m.reply(mensajes);
        } else if (Array.isArray(json) && json.length === 0) {
            await m.reply('No hay mensajes en este momento.');
        } else {
            await m.reply('Formato de respuesta inesperado.');
        }
    } catch (error) {
        await m.reply('Error obteniendo los mensajes: ' + error.message);
    }
};

handler.help = ['getmessage'];
handler.tags = ['search'];
handler.command = ['getmessage'];
handler.register = true;

export default handler;