

/_- `PLUGIN DOWNLOAD MEDIAFIRE`- By KenisawaDev_/
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`Ingresa un link de mediafire\n*🌸 Ejemplo:* ${usedPrefix}${command} (link unavailable));

conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

let ouh = await fetch(`(link unavailable))
let gyh = await ouh.json()

// Agregar límite de tamaño
if (gyh.data[0].size > 2147483648) { // 2 GB
throw m.reply('Error: El archivo es demasiado grande. Tamaño máximo permitido: 2 GB.');
}

await conn.sendFile(m.chat, gyh.data[0].link, `${gyh.data[0].nama}`, `*🌹 Nombre:* ${gyh.data[0].nama}\n*🪷 Tamaño:* ${gyh.data[0].size}\n*🍒 Extensión:* ${gyh.data[0].mime}\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝑡𝐭ⷭ𓆪͟͞ `, m)
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}

handler.help = ['mediafire']
handler.tags = ['descargas']
handler.command = /^(mediafire|mf)$/i
handler.premium = false
handler.register = true

export default handler

