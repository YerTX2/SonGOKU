import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de YouTube`, m)

try {
let api = await (await fetch(`https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${text}`)).json()
let dl_url = api.data.url

await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: null }, { quoted: m })
} catch (error) {
console.error(error)
}}

handler.command = ['ytmpp4']

export default handler