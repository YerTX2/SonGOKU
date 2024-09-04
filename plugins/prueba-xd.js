import fetch from 'node-fetch';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {

    async function getMail() {
        try {
            let response = await fetch('https://api.cafirexos.com/api/tempmail/getmail');
            let json = await response.json(); 

            let correo = json.correo; 

            await m.reply(correo);
        } catch (error) {
            await m.reply('Error fetching data: ' + error.message);
        }
    }

    await getMail(); 
};

handler.help = ['getemail'];
handler.tags = ['tools'];
handler.command = ['getemail'];
// handler.limit = 1;
handler.register = true;

export default handler;