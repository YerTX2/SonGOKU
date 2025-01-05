import fs from 'fs'

let cooldown = 60000 // Tiempo de espera entre intentos (en milisegundos)
let poin = 450 // Puntos por responder correctamente

let handler = async (m, { conn, usedPrefix }) => {
    let now = new Date()
    let userData = global.db.data.users[m.sender]
    
    if (!userData) {
        global.db.data.users[m.sender] = { lastAcet: 0 } // Asegurarse de que exista el usuario en la base de datos
        userData = global.db.data.users[m.sender]
    }

    let lastUsage = userData.lastAcet || 0
    if (now - lastUsage < cooldown) {
        let remainingTime = cooldown - (now - lastUsage)
        return m.reply(`⏱️ ¡Espera ${msToTime(remainingTime)} antes de volver a usar el comando!`)
    }

    conn.tekateki = conn.tekateki || {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Todavía hay acertijos sin responder en este chat', conn.tekateki[id][0])
        return null
    }

    let tekateki = []
    try {
        tekateki = JSON.parse(fs.readFileSync(`./plugins/_acertijo.json`))
    } catch (err) {
        return m.reply('¡Error al leer el archivo de acertijos!')
    }

    let json = tekateki[Math.floor(Math.random() * tekateki.length)]
    let _clue = json.response
    let clue = _clue.replace(/[A-Za-z]/g, '_')
    let caption = `
ⷮ *${json.question}*
*• Tiempo:* ${(cooldown / 1000).toFixed(2)} segundos
*• Bono:* +${poin} Exp
`.trim()

    conn.tekateki[id] = [
        await conn.reply(m.chat, caption, m), 
        json, 
        poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) {
                await conn.reply(m.chat, `Se acabó el tiempo!\n*Respuesta:* ${json.response}`, conn.tekateki[id][0])
                delete conn.tekateki[id]
            }
        }, cooldown)
    ]

    // Aquí se escucha la respuesta del usuario después de un cierto tiempo
    conn.on('message', async (msg) => {
        if (msg.chat !== id) return // Solo escuchar respuestas en el mismo chat
        if (msg.sender === m.sender) { // Asegurarse de que es el mismo usuario que inició el acertijo
            let userAnswer = msg.text.trim().toLowerCase()
            let correctAnswer = json.response.trim().toLowerCase()
            
            if (userAnswer === correctAnswer) {
                await conn.reply(m.chat, `🎉 ¡Respuesta correcta! Has ganado +${poin} Exp`, m)
                // Aquí puedes añadir puntos al usuario si lo deseas
            } else {
                await conn.reply(m.chat, `❌ ¡Respuesta incorrecta! La respuesta correcta era: *${json.response}*`, m)
            }
            // Eliminar el acertijo después de que el usuario responda
            delete conn.tekateki[id]
        }
    })

    userData.lastAcet = now
}

handler.help = ['acertijo']
handler.tags = ['game']
handler.command = /^(acertijo|acert|pregunta|adivinanza|tekateki)$/i
export default handler

// Función para convertir la duración en minutos y segundos
function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60)

    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return minutes + " Minuto(s) " + seconds + " Segundo(s)"
}
