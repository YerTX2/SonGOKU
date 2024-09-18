import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return conn.reply(m.chat, '🔍 Ingresa el título de un video o canción de YouTube.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Gemini Aaliyah - If Only`, m)
    let results = await Scraper.ytsearch(text)
    if (!results || !results.length) return conn.reply(m.chat, `No se encontraron resultados.`, m)
    const formattedData = {
title: `\`[ YOUTUBE - SEARCH ]\`\n\n> 🤍 *\`Titulo :\`* ${bestItem.title}\n> 🤍 *\`Duración :\`* ${bestItem.timestamp}\n> 🤍 *\`Visitas :\`* ${bestItem.views}\n> 🤍 *\`Subido :\`* ${bestItem.ago}\n> 🤍 *\`Url :\`* ${bestItem.url}`,
rows: [{
title: "Vídeo más Popular 😼",
highlight_label: "Popular",
rows: [{
header: bestItem.title,
id: `${usedPrefix}ytmp4 ${bestItem.url}`,
title: bestItem.title,
description: ""
}]
}, {
title: "Videos Encontrados 🤍",
rows: videoItems.map(({
title,
url,
description
}, index) => ({
header: `${index + 1}). ${title}`,
id: `.ytmp4 ${url}`,
title: title,
description: ""
}))
}]
}
const emojiMap = {
type: "🎥",
videoId: "🆔",
url: "🔗",
title: "📺",
description: "📝",
image: "🖼️",
thumbnail: "🖼️",
seconds: "⏱️",
timestamp: "⏰",
ago: "⌚",
views: "👀",
author: "👤"
}
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
}
handler.help = ['ytsearch <búsqueda>']
handler.tags = ['search']
handler.command = ['ytsearch', 'yts']
handler.register = true 
export default handler