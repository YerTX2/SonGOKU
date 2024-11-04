import fg from 'api-dylux'
import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
let limit = 500

let handler = async (m, { conn, args, text, isPrems, isOwner, usedPrefix, command }) => {
if (!args || !args[0]) return conn.reply(m.chat, `🐉 Escribe la URL de un video de YouTube que deseas descargar.`, m)
if (!args[0].match(/youtu/gi)) return conn.reply(m.chat,`Verifica que la *URL* sea de YouTube`, m).then(_ => m.react('✖️'))
let q = args[1] || '360p'

await m.react('🕓')
try {
const yt = await fg.ytv(args[0], q)
let { title, dl_url, size } = yt 
let vid = (await yts(text)).all[0]

if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m).then(_ => m.react('✖️'))

await conn.sendMessage(m.chat, {
        text: `🇦🇱 *Título ∙* ${title}\n⚖️ *Tamaño ∙* ${size}\n\n*↻ Espera @${m.sender.split`@`[0]}, se está enviando su video en 360P. . .*`,
        contextInfo: { 
          mentionedJid: [m.sender],
        }
      }, { quoted: m })

await conn.sendFile(m.chat, dl_url, 'yt.jpg', `${vid.title}\n⇆ㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤ↻\n Duración ${vid.timestamp}`, m)
await m.react('✅')
} catch {
try {
let yt = await fg.ytmp4(args[0], q)
let { title, size, dl_url } = yt
let vid = (await yts(text)).all[0]

if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m).then(_ => m.react('✖️'))

await conn.sendMessage(m.chat, {
        text: `🇦🇱 *Título ∙* ${title}\n⚖️ *Tamaño ∙* ${size}\n\n*↻ Espera @${m.sender.split`@`[0]},se  está enviando su video . . .*`,
        contextInfo: { 
          mentionedJid: [m.sender],
        }
      }, { quoted: m })

await conn.sendFile(m.chat, dl_url, 'yt.jpg', `${vid.title}\n⇆ㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤ↻\n Duración ${vid.timestamp}`, m)
await m.react('✅')
} catch {
await conn.reply(m.chat,`*☓ Ocurrió un error inesperado pesa más de 130MB use el comando ytmp4doc para descargar *`, m).then(_ => m.react('✖️'))
//console.error(error)
}}}
handler.help = ['ytmp4 <yt url>']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'yt', 'ytv']
handler.limit = 5
handler.group = true
export default handler