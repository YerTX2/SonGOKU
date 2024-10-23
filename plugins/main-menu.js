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