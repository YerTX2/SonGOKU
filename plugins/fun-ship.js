var handler = async (m, { conn, command, text }) => {

if (!text) return conn.reply(m.chat, `💓 *Escribe tu nombre y de la persona que te gusta*`, m)
let [text1, ...text2] = text.split(' ')

text2 = (text2 || []).join(' ')
if (!text2) return conn.reply(m.chat, `🚩 *Escribe el nombre de la segunda persona*`, m)
let love = `❤️ *${text1}* tu oportunidad de estar con  *${text2}* es de *${Math.floor(Math.random() * 100)}%* 👩🏻‍❤️‍👨🏻`

m.reply(love, null, { mentions: conn.parseMention(love) })

}
handler.help = ['%amor']
handler.tags = ['game']
handler.command = /^(%amor)$/i

handler.register = true

export default handler
