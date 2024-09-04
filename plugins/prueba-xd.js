const fetch = require('node-fetch');


let handler = async (m, { conn, text, args, usedPrefix, command }) => {

async function getMail() {
    try {
        let response = await fetch('https://api.cafirexos.com/api/tempmail/getmail');
        let text = await response.text();
        
        let correo = text.match(/"correo":\s*"([^"]+)"/)[1];
        
        await m.reply(correo);
    } catch (error) {
        await m.reply('Error fetching data:', error);
    }
}

getMail();

handler.help = ['getemail']
handler.tags = ['search']
handler.command = ['getemail']
//handler.limit = 1
handler.register = true

export default handler