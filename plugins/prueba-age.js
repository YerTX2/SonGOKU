let handler = async (m, { conn, text, args, usedPrefix, command }) => {
let response = args.join(' ').split('|')
if (!text | !text2) return m.reply(`🔍 Ingresa un texto junto al comando.`)
try {
let res = `https://api.popcat.xyz/caution?text=${text}+${text2}`
await conn.sendFile(m.chat, res, 'thumbnail.jpg', null, m)
} catch {
}}
handler.help = ['advertence <texto>']
handler.tags = ['logo']
handler.command = ['advertence', 'advert']
//handler.limit = 1
handler.register = true 
export default handler