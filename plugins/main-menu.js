import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': 'Info',
  'serbot': 'Sub Bots',
  'rpg': 'RPG',
  'rg': 'Registro',
  'sticker': 'Stickers',
  'img': 'Imágenes',
  'group': 'Grupos',
  'logo': 'Logo',
  'nable': 'On/Off', 
  'tools': 'Herramientas',
  'nsfw': 'Nsfw', 
  'owner': 'Creador', 
  'advanced': 'Avanzado',
  '+18': '+18',
  
}

const defaultMenu = {
  before: `  
ঔৣ͜͡SonGokuBOTꦽꦼᬏ
⸼݇҉ֻ᠂⃟🐉─➤Github: github.com/YerTX2/SonGOKU 
╭──────────────────✎
╰─➤INFO
│㆒⸼݇҉ֻ᠂⃟🐉KI : %limit
│㆒⸼݇҉ֻ᠂⃟🐉Exp : %totalexp
│㆒⸼݇҉ֻ᠂⃟🐉Nivel : %level
╰─────➤☆ۣۜۜ͜͡%name𖣘⃟ᗒ  
 ㆒⸼݇҉ֻ᠂⃟🐉ACTIVO: %uptime 
 %readmore
`.trimStart(),
  header: '`✧͜͡҉MENU %category⛤⃗͜ᬏ᭄`\n\n┌─⋅☆·̇·̣̇̇·̣̣̇·̣̇̇·̇⸼݇҉ֻ᠂⃟🐉୨୧┈┈┈୨୧⸼݇҉ֻ᠂⃟🐉·̇·̣̇̇·̣̣̇·̣̇̇☆─⋅┐',
  body: '│ ⋆ ҈͜͡➳ %cmd*\n',
  footer: '└─⋅☆·̇·̣̇̇·̣̣̇·̣̇̇·̇⸼݇҉ֻ᠂⃟🐉୨୧┈┈┈୨୧⸼݇҉ֻ᠂⃟🐉·̇·̣̇̇·̣̣̇·̣̇̇☆─⋅┘\n',
  after: '',
}

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    let uniqueUsers = new Map();


  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help','goku', 'menú'] 
handler.register = true 
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
