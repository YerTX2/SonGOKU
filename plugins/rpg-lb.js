

let handler = async (m, { conn, args, participants }) => {
let users = Object.entries(global.db.data.users).map(([key, value]) => {
return {...value, jid: key}})
let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
let sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
let usersExp = sortedExp.map(enumGetKey)
let usersLim = sortedLim.map(enumGetKey) 
let usersLevel = sortedLevel.map(enumGetKey)
let len = args[0] && args[0].length > 0 ? Math.min(5, Math.max(parseInt(args[0]), 5)) : Math.min(5, sortedExp.length)
let text = `
🔥 *RANKING Z - * 🔥
━━━━━━━━━━━━━━━━━━━━━━━
🏆 *TOP ${len} KI ⚡* 🏆
${sortedLim.slice(0, len).map(({ jid, limit }, i) => 
`   ${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)})` : '@'}${jid.split`@`[0]} - *${limit}⚡*`).join('\n')}
💥 *Tu Nivel KI*: ${usersLim.indexOf(m.sender) + 1}/${usersLim.length}
━━━━━━━━━━━━━━━━━━━━━━━

🌌 *TOP ${len} XP - PODER TOTAL 💫* 🌌
${sortedExp.slice(0, len).map(({ jid, exp }, i) => 
`   ${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)})` : '@'}${jid.split`@`[0]} - *${exp}💫*`).join('\n')}
✨ *Tu Experiencia*: ${usersExp.indexOf(m.sender) + 1}/${usersExp.length}
━━━━━━━━━━━━━━━━━━━━━━━

⚡ *TOP ${len} NIVELES - MÁS ALLÁ DEL LÍMITE 📈* ⚡
${sortedLevel.slice(0, len).map(({ jid, level }, i) => 
`   ${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)})` : '@'}${jid.split`@`[0]} - *Nivel ${level}📈*`).join('\n')}
🌟 *Tu Nivel Actual*: ${usersLevel.indexOf(m.sender) + 1}/${usersLevel.length}
━━━━━━━━━━━━━━━━━━━━━━━

 *¡DESAFÍA TUS LÍMITES Y CONVIÉRTETE EN EL MÁS FUERTE!* 
`.trim();

  m.reply(text, null, { mentions: conn.parseMention(text) })
}
handler.help = ['lb']
handler.tags = ['rpg']
handler.command = ['leaderboard', 'lb'] 
handler.register = true 
handler.fail = null
handler.exp = 0

export default handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) =