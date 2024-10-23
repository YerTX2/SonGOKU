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

    let listSections = [];

        listSections.push({
        title: `🔖 SELECCIÓNA LO QUE NECESITES`, highlight_label: `Popular 複|ᴋᴜʀᴜᴍɪᏴo͢Ꭲツ`,
        rows: [
            {
                header: "AUTO VERIFICAR ✅",
                title: "",
                description: `Verificacion Automáticamente`,
                id: `.reg Kurumi.18`,
            },
            {
                header: "MENU COMPLETO 🇦🇱",
                title: "",
                description: `𝘮𝘶𝘦𝘴𝘵𝘳𝘢 𝘦𝘭 𝘮𝘦𝘯𝘶 𝘤𝘰𝘮𝘱𝘭𝘦𝘵𝘰`,
                id: `.allmenu`,
            }, 
            
          
            {
                header: "MENU DESCARGAS 📥",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘦𝘭 𝘮𝘦𝘯𝘶 𝘥𝘦 𝘥𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘴`,
                id: `${usedPrefix}menudl`,
            },
             {
                header: "MENU  GRUPO👥",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘦𝘭 𝘮𝘦𝘯𝘶 𝘥𝘦 grupos`,
                id: `${usedPrefix}menugrupo`,
            }, 
             {
                header: "MENU SEARCH",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘦𝘭 𝘮𝘦𝘯𝘶 𝘥𝘦 SEARCH`,
                id: `${usedPrefix}menusearch`,
            },
             {
                header: "MENU NSFW 🔞",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘦𝘭 𝘮𝘦𝘯𝘶 𝘤𝘢𝘭𝘪𝘦𝘯𝘵𝘦`,
                id: `${usedPrefix}labiblia`,
            },
            {
                header: "REDES 🇦🇱",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘭𝘢𝘴 𝘳𝘦𝘥𝘦𝘴 𝘥𝘦𝘭 𝘣𝘰𝘵`,
                id: `${usedPrefix}redes`,
            },
            {
                header: "GRUPOS 🌟",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘭𝘰𝘴 𝘨𝘳𝘶𝘱𝘰𝘴 𝘥𝘦𝘭 𝘣𝘰𝘵`,
                id: `${usedPrefix}grupos`,
            },
        ],
    });

    let vid = "https://i.ibb.co/94vgRtb/file.jpg";
    let img = "https://i.ibb.co/94vgRtb/file.jpg";
    let img2 = "https://i.ibb.co/94vgRtb/file.jpg";
    let img3 = "https://i.ibb.co/94vgRtb/file.jpg";
    let img4 = "https://i.ibb.co/94vgRtb/file.jpg";
    let img5 = "https://i.ibb.co/94vgRtb/file.jpg";
    let img6 = "https://i.ibb.co/94vgRtb/file.jpg";
    let img8 = "https://i.ibb.co/94vgRtb/file.jpg";
    let img9 = "https://i.ibb.co/94vgRtb/file.jpg";
    let img10 = "https://i.ibb.co/94vgRtb/file.jpg";
    let img11 = "https://i.ibb.co/94vgRtb/file.jpg";

    await conn.sendListB(m.chat, menu, txt, ` MENU LISTA KURUMI`, [vid, img, img2, img3, img4, img5, img6, img8, img9, img10, img11].getRandom(), listSections, estilo);
};


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
