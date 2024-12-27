let cooldowns = {}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let tiempoEspera = 15
    let users = global.db.data.users[m.sender]
    let apuesta = parseInt(args[0])

    if (!args[0]) return m.reply('🌀 Ingresa la cantidad de *⚡ Ki* que deseas apostar.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* 10`)
    if (isNaN(args[0])) return m.reply('🚩 Ingresa un número válido.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* 10`)
    if (apuesta < 1) return m.reply('🚩 La apuesta mínima es *1 ⚡ Ki*.')

    if (apuesta > users.limit) return m.reply(`🚩 No tienes suficientes *⚡ Ki*. Tienes actualmente *${users.limit} ⚡ Ki* disponibles.`)

    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
        let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
        return m.reply(`⏱ Espera *${tiempoRestante}* para apostar nuevamente.`)
    }

    let emojis = ["🐉", "🥇", "✨"]
    let a = Math.floor(Math.random() * emojis.length)
    let b = Math.floor(Math.random() * emojis.length)
    let c = Math.floor(Math.random() * emojis.length)
    let x = [],
        y = [],
        z = []
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a]
        a = (a + 1) % emojis.length
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b]
        b = (b + 1) % emojis.length
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c]
        c = (c + 1) % emojis.length
    }

    let end
    if (x[1] === y[1] && y[1] === z[1]) {
        end = `🎉 ¡Ganaste! Obtienes *${apuesta} ⚡ Ki*.`
        users.limit += apuesta
    } else if (x[1] === y[1] || x[1] === z[1] || y[1] === z[1]) {
        end = `Casi lo logras, sigue intentando. Recibes *1 ⚡ Ki*.`
        users.limit += 1
    } else {
        end = `😔 Perdiste *${apuesta} ⚡ Ki*.`
        users.limit -= apuesta
    }

    cooldowns[m.sender] = Date.now()

    return await conn.reply(
        m.chat,
        `
🎰 | *SLOTS* 
──────────
${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}
────────── 

${end}`,
        m
    )
}

handler.help = ['slot <apuesta>']
handler.tags = ['game', 'rpg']
handler.command = ['slot']
handler.register = true
handler.group = false
export default handler

function segundosAHMS(segundos) {
    return `${segundos} segundos`
}