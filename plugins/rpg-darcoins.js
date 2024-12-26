import MessageType from '@whiskeysockets/baileys'
let impuesto = 0.02
let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw '🚩 Menciona al usuario con *@user.*'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw '🚩 Ingrese la cantidad de *⚡ ki* que quiere transferir.'
    if (isNaN(txt)) throw 'Sólo números.'
    let poin = parseInt(txt)
    let limit = poin
    let imt = Math.ceil(poin * impuesto)
    limit += imt
    if (limit < 1) throw '🚩 Mínimo es *1 ⚡ki*.'
    let users = global.db.data.users
    if (limit > users[m.sender].limit) throw 'No tienes suficientes *⚡ ki* para dar.'
    users[m.sender].limit -= limit
    users[who].limit += poin

    await m.reply(`*${-poin}* *⚡ ki 
Impuesto 2% : *${-imt}* *⚡ ki
Total gastado: *${-limit}* *⚡ ki`)
    conn.fakeReply(m.chat, `*+${poin}* *⚡ ki.*`, who, m.text)
}
handler.help = ['darstars *@user <cantidad>*']
handler.tags = ['rpg']
handler.command = ['darki', 'darstars']
handler.register = true 

export default handler