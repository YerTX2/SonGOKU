import yts from 'music.apple-search'

let handler = async (m, {conn, usedPrefix, text }) => {
   if (!text) return conn.reply(m.chat, '*🚩 Ingresa lo que deseas buscar en YouTube.*', m)
   await m.react('🕓')
   let results = await yts(text)
   let res = results.all.map(v => v).filter(v => v.type == "audio")
   if (!res.length) return conn.reply(m.chat, 'No se encontraron resultados, intente con un nombre más Corto.', m).then(_ => m.react('✖️'))
   let txt = `*Apple - Search*`
   for (let i = 0; i < (30 <= res.length ? 30 : res.length); i++) {
      txt += `\n\n`
          txt += `        ◦  *Titulo* : ${res[i].title}\n`
          txt += `        ◦  *Duración* : ${res[i].timestamp || '×'}\n`
          txt += `        ◦  *Publicado* : ${res[i].ago}\n`
          txt += `        ◦  *Autor* : ${res[i].author.name || '×'}\n`
          txt += `        ◦  *Url* : ${'https://music.apple.com/us'\n`
          }
   await conn.sendFile(m.chat, res[0].image, '', txt, m)
   await m.react('✅')
}
handler.help = ['ytsearch']
handler.tags = ['search']
handler.command = ['applesearch', 'applemusicsearch']
handler.register = true 
export default handler