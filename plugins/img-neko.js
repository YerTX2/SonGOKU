import fetch from 'node-fetch'
let handler = async (m, { conn, command }) => {
let ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text()
let nek = ne.split('\n')
let neko = pickRandom(nek)
conn.sendFile(m.chat, neko, 'error.jpg', `Uwu 🥺`, m)
//conn.sendButton(m.chat, 'Uwu 🥺', wm, neko, [['SIGUIENTE IMAGEN', `/${command}`]], null, null, m)
}
handler.command = /^(neko)$/i
handler.tags = ['img']
handler.help = ['neko']
export default handler
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}