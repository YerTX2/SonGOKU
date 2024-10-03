import fg from 'api-dylux'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import yts from 'yt-search'
import fetch from 'node-fetch' 
let limit = 100

let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
if (!args || !args[0]) conn.reply(m.chat, `🧃 Escribe la URL de un video de YouTube que deseas descargar.`,  m)
if (!args[0].match(/youtu/gi)) return conn.reply(m.chat, `Verifica que la *URL* sea de YouTube`, m).then(_ => m.react('✖️'))
let q = '128kbps'

await m.react('🕓')
try {
const yt = await fg.yta(args[0])
let { title, dl_url, size } = yt
let vid = (await yts(text)).all[0]
let { thumbnail, url } = vid

if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m).then(_ => m.react('✖️'))

await conn.sendMessage(m.chat, {
        text: `  🍭 *Título ∙* ${title}\n\n⚖️ *Tamaño ∙* ${size}\n\n*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .* .`,
        contextInfo: { 
          mentionedJid: [m.sender],
        }
      }, { quoted: m })
await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: "audio/mp4", fileName: title + '.mp3', quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${title}`,
body: `${vid.author.name}`,
mediaType: 2, 
sourceUrl: `${url}`,
thumbnail: await (await fetch(vid.thumbnail)).buffer()}}}, { quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.ytmp3(args[0])
let { title, size, dl_url } = yt
let vid = (await yts(text)).all[0]
let { thumbnail, url } = vid

if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`,  m, fake,).then(_ => m.react('✖️'))

await conn.sendMessage(m.chat, {
        text: `  🍭 *Título ∙* ${title}\n\n⚖️ *Tamaño ∙* ${size}\n\n*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .* .`,
        contextInfo: { 
          mentionedJid: [m.sender],
        }
      }, { quoted: m })
await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: "audio/mp4", fileName: title + '.mp3', quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${title}`,
body: `${vid.author.name}`,
mediaType: 2, 
sourceUrl: `${url}`,
thumbnail: await (await fetch(vid.thumbnail)).buffer()}}}, { quoted: m })
await m.react('✅')
} catch {
await conn.reply(m.chat, `*☓ Ocurrió un error inesperado*`,  m, fake,).then(_ => m.react('✖️'))
console.error(error)
}}}
handler.help = ['ytmp3 <yt url>']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'yta']
handler.register = true 
//handler.limit = 1
export default handler