import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de YouTube`, m)

try {
    let response = await fetch(`https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${text}`)
    let api = await response.json()
    
    if (!api || !api.data || !api.data.url) {
        return conn.reply(m.chat, `❀ No se pudo obtener el enlace de descarga. Por favor, verifica el link ingresado.`, m)
    }
    
    let dl_url = api.data.url
    let res = await fetch(dl_url)
    
    if (!res.ok) {
        return conn.reply(m.chat, `❀ Error al descargar el video.`, m)
    }
    
    await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: null }, { quoted: m })
} catch (error) {
    console.error(error)
    conn.reply(m.chat, `❀ Ocurrió un error al procesar tu solicitud.`, m)
}}

handler.command = ['ytmpp4']

export default handler