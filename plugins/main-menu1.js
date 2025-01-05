let handler = async (m, { text, conn, usedPrefix, command }) => {
let texto = `

_¡Bienvenido a SonGoku! Este bot te ofrece herramientas útiles, entretenimiento y acceso a diversas funciones desde tu WhatsApp._

Opciones disponibles
*Menú Completo*: Muestra todos los comandos del bot.
*Subbot*: _Genera un código para que te conviertas en subbot de SonGoku._
*INFO BOT*: _Información sobre los desarrolladores, grupos y canales oficiales._

`
 await conn.sendMessage(m.chat, {
      image: { url: 'https://tinyurl.com/2azetyjh' },
      caption: texto,
      footer: botname + ` | collaboration with I'm Fz ~`,
      buttons: [
        {
          buttonId: `.menucompleto`,
          buttonText: {
            displayText: 'MENU COMPLETO',
          },
        },
        {
          buttonId: `.serbot`,
          buttonText: {
            displayText: 'SERBOT',
          },
        },
        {
          buttonId: `.cuentas`,
          buttonText: {
            displayText: 'INFO BOT',
          },
        },        
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });
}
handler.command = ['menu']
handler.help = ['menu']
handler.tags = ['main']
export default handler