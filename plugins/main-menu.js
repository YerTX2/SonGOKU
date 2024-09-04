import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': 'Info',
  'search': 'Busquedas',
  'serbot': 'Sub Bots',
  'rpg': 'RPG',
  'rg': 'Registro',
  'sticker': 'Stickers',
  'img': 'Imágenes',
  'group': 'Grupos',
  'logo': 'Logo',
  'nable': 'On/Off', 
  'downloader': 'Descargas',
  'tools': 'Herramientas',
  'nsfw': 'Nsfw', 
  'owner': 'Creador', 
  'advanced': 'Avanzado', 
  '+18': '+18',
  
}

const defaultMenu = {
  before: `  
> SON GOKU
> Son%name*,"  
┌--┈┈∘┈˃̶༒˂̶┈∘┈
  ⁀➷Nombre %name
  ⁀➷ki %limit
  ⁀➷exp %totalexp
  ⁀➷Nivel %level
╰--┈┈∘┈˃̶༒˂̶┈∘┈
> 孫ՏᴏɴᏀᴏᴋᴜ孫: %uptime
 %readmore
`.trimStart(),
  header: '`MENU X %category`\n\n╭── ⋅ ⋅ ──孫ՏᴏɴᏀᴏᴋᴜ孫── ⋅ ⋅ ──╮',
  body: '> ⋆ ★%cmd*\n',
  footer: '╰── ⋅ ⋅ ──孫ՏᴏɴᏀᴏᴋᴜ孫── ⋅ ⋅ ──╯  \n',
  after: '',
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : ``) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '' : '')
                .replace(/%isPremium/g, menu.premium ? '' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
      wasp: '@0',
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      version: _package.version,
      npmdesc: _package.description,
      npmmain: _package.main,
      author: _package.author.name,
      license: _package.license,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
let urls = [
"https://telegra.ph/file/fa9c0515f3b2f6df9f2bd.mp4",
"https://telegra.ph/file/0779e78886636806c7422.mp4", 
"https://telegra.ph/file/d791a9594ac30fbf97183.mp4", 
"https://telegra.ph/file/6a0a1eabb9b50b9744543.mp4", 
"https://telegra.ph/file/4f8676c687995ec8333cb.mp4",
"https://telegra.ph/file/c4c2f5d0931ac30accca2.mp4", 
"https://telegra.ph/file/0a9683f4aedcae4eca935.mp4", 
"https://telegra.ph/file/3ba419b5970c3812dbac6.mp4", 
"https://telegra.ph/file/c023e62cf15c5cb85caab.mp4", 
"https://telegra.ph/file/636df9fe26f85b6fd2ade.mp4" 
];
let gifUrl = urls[Math.floor(Math.random() * urls.length)];
await conn.sendMessage(m.chat, {video: {url: gifUrl}, gifPlayback: true, caption: text.trim(), mentions: [m.sender]}, {quoted: m});


  } catch (e) {
    conn.reply(m.chat, 'Lo sentimos, el menú tiene un error.', m)
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
