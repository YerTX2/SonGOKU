import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de YouTube`, m)

try {
    let response = await fetch(`https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${text}`)
    let api = await response.json()
    
    console.log(api) 

    if (!api || !api.datos || !api.datos.descargar || !api.datos.descargar.url) {
        return conn.reply(m.chat, `❀ No se pudo obtener el enlace de descarga. Por favor, verifica el link ingresado.`, m)
    }

    let dl_url = api.datos.descargar.url
    console.log(`Enlace de descarga: ${dl_url}`) 

    await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: api.datos.título }, { quoted: m })
} catch (error) {
    console.error(`Error: ${error.message}`)
    conn.reply(m.chat, `❀ Ocurrió un error al procesar tu solicitud.`, m)
}}

handler.command = ['ytmpp4']

export default handler