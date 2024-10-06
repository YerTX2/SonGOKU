import fetch from 'node-fetch'
import { mediafiredl } from '@bochilteam/scraper'

var handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems }) => {

var limit
if((isOwner || isPrems)) limit = 1000
else limit = 600

if (!args[0]) throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙈𝙀𝘿𝙄𝘼𝙁𝙄𝙍𝙀*\n\n❕ 𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix}mediafire* https://www.mediafire.com/file/941xczxhn27qbby/GBWA_V12.25FF-By.SamMods-.apk`
if (!args[0].match(/mediafire/gi)) throw `[❗𝐈𝐍𝐅𝐎❗] 𝙇𝙄𝙉𝙆 𝙄𝙉𝘾𝙊𝙍𝙍𝙀𝘾𝙏𝙊*`
try {
m.react(rwait)
let full = /f$/i.test(command)
let u = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url: u }))).buffer()
let res = await mediafiredl(args[0])
let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
let isLimit = (isPrems || isOwner ? limit : limit) * 1012 < filesize

await conn.reply(m.chat, 
    `💌 *Nombre:* ${filename}\n📊 *Peso:* ${filesizeH}\n🗂️ *Tipo:* ${ext}\n🗳️ *Subido:* ${aploud}\n*🧿 Enviando, por favor espera...*\n> Mientras esperas, sígueme en mi canal crack 😎`,
    m,
    {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                showAdAttribution: true,
                title: packname,  // Título personalizado
                body: wm,         // Texto de cuerpo personalizado
                previewType: 0,
                sourceUrl: channel // URL del canal
            }
        }
    }
);

if(!isLimit) await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
m.react(done)
} catch (e) {
m.reply(`*[❗𝐈𝐍𝐅𝐎❗] 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊.𝘿𝙀𝘽𝙀 𝘿𝙀 𝙎𝙀𝙍 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝙑𝘼𝙇𝙄𝘿𝙊 𝘿𝙀 𝙈𝙀𝘿𝙄𝘼𝙁𝙄𝙍𝙀*`)
console.log(e)}

}
handler.help = ['mediafire']
handler.tags = ['descargas']
handler.command = ['mediafire', 'mfire']
handler.diamond = true
handler.register = true

export default handler