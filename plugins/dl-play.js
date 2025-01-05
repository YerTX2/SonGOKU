import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `❗ Por favor ingresa un texto para buscar.\nEjemplo: ${usedPrefix + command} Nombre del video`;
  }

  
  const search = await yts(text);
  const videoInfo = search.all?.[0];

  if (!videoInfo) {
    throw '❗ No se encontraron resultados para tu búsqueda. Intenta con otro título.';
  }

  const body = `
🎥 *YσuTυbє Plαy*  
━━━━━━━━━━━━━━━━━━━━  
📌 *🎬 Tιтlє:* ${videoInfo.title}  
👀 *💯 Vιѕtαѕ:* ${videoInfo.views.toLocaleString()}  
⏱️ *⏳ Dυrαcισn:* ${videoInfo.timestamp}  
📅 *🕒 Pυblιcαdσ:* ${videoInfo.ago}  
🔗 *🌐 URL:* ${videoInfo.url}  
  
Elige una de las opciones para descargar:
🎵 *Audio* o 📽️ *Video*
  `;

  await conn.sendMessage(
    m.chat,
    {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: `© Bot | 🐉SonGoku🐉`,
      buttons: [
        { buttonId: `.ytmp3 ${videoInfo.url}`, buttonText: { displayText: '🎵 Audio' } },
        { buttonId: `.ytmp6 ${videoInfo.url}`, buttonText: { displayText: '📽️ Video' } },
        { buttonId: `.ytmp4doc ${videoInfo.url}`, buttonText: { displayText: '📼 Video Doc' } },
      ],
      viewOnce: true,
      headerType: 4,
    },
    { quoted: m }
  );
  m.react('✅'); // Reacción de éxito
};

handler.command = ['play', 'playvid', 'play2'];
handler.tags = ['downloader']
handler.group = true
handler.limit = 6

export default handler;