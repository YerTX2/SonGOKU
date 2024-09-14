let handler = async (m, { conn, usedPrefix, command}) => {
    let pp = 'https://tinyurl.com/23zlp9h7'
    let pp2 = 'https://tinyurl.com/23zlp9h7'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) return conn.reply(m.chat, '💙 Menciona al usuario con *@user*', m, rcanal)
    let name2 = conn.getName(who)
    let name = conn.getName(m.sender)
    
    await conn.sendMessage(m.chat, { video: { url: [pp, pp2].getRandom() }, gifPlayback: true, caption: `*${name}*` + 'Esta violando🍆 a' + ` *${name2}*` + ' 💦💦 *:・ﾟ✧' }, { quoted: m })
    }
    handler.help = ['follar *<@user>*']
    handler.tags = ['fun']
    handler.command = ['cum', 'follar']
    export default handler