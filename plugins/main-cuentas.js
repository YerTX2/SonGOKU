import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
let img = `https://qu.ax/erWrK.jpg`
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
let contact = {
tesis: '5212431268546',
yer: '51907376960',
matias: '5492215022907'
}
let txt = `*👥 Bienvenido al menú de Cuentas 👥*
---

**Accede a los principales enlaces de la comunidad y el staff del bot:**  

- **Grupos de WhatsApp:**  
  Únete a los grupos oficiales de la comunidad para compartir ideas y resolver dudas con otros usuarios.  

- **Comunidad de WhatsApp del bot:**  
  Forma parte de la comunidad dedicada al uso y desarrollo del bot, donde podrás obtener soporte y compartir sugerencias.  

- **Desarrolladores:**  
  Encuentra los números de contacto del equipo de staff, listos para asistirte en caso de problemas.  

🔙 **Atrás:**  
Regresa al menú principal para explorar más opciones.  

⚠️ **Nota importante:**  
Si encuentras problemas al unirte a los grupos o canales, verifica que los enlaces están activos. En caso de inconvenientes, no dudes en contactar al administrador.  
--- 
`;
await conn.sendMessage(m.chat, {
  image: { url: img },
  caption: txt,
  footer: '©' + botname + ` | In collaboration with I'm Fz ~`,
  buttons: [
{
  buttonId: `.comunidad`,
  buttonText: {
displayText: 'Comunidad del bot',
  },
},
{
  buttonId: `.desarrolladores`,
  buttonText: {
displayText: 'Staff SonGoku',
  },
},
{
  buttonId: `.menu`,
  buttonText: {
displayText: '↩️ ATRÁS ',
  },
},
  ],
viewOnce: true,
headerType: 4,
contextInfo: {
mentionedJid: conn.parseMention(txt),
isForwarded: true,
forwardingScore: 999,
externalAdReply: {
title: botname,
body: '',
sourceUrl: 'https://whatsapp.com/channel/0029Vaj67qQJUM2Wa5Ey3y1v',
mediaType: 1,
thumbnailUrl: img,
renderLargerThumbnail: false
}}}, { quoted: m })
};

handler.help = ['cuentas'];
handler.tags = ['main'];
handler.command = /^(cuentas)$/i;

export default handler;