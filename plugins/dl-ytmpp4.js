//SonGOKU 



import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let queryOrUrl = text.trim();
    if (!queryOrUrl) {
      return conn.reply(
        m.chat,
        `Por favor, ingresa un *enlace de YouTube* o un *texto*.\n\n*Ejemplo:*\n${usedPrefix + command} Never Gonna Give You Up\n${usedPrefix + command} https://youtu.be/dQw4w9WgXcQ`,
        m
      );
    }

    let videoData;
    if (queryOrUrl.startsWith('http')) {

      const response = await fetch(`https://ytdownloader.nvlgroup.my.id/info?url=${queryOrUrl}`);
      if (!response.ok) throw new Error('Error al obtener información del video.');
      videoData = await response.json();
    } else {

      const searchResults = await yts(queryOrUrl);
      if (!searchResults.videos.length) {
        return conn.reply(m.chat, 'No se han encontrado resultados para tu búsqueda.', m);
      }
      const firstVideo = searchResults.videos[0];
      queryOrUrl = firstVideo.url;
      const response = await fetch(`https://ytdownloader.nvlgroup.my.id/info?url=${queryOrUrl}`);
      if (!response.ok) throw new Error('Error al obtener información del video.');
      videoData = await response.json();
    }

    const { title, duration, thumbnail, views, url } = videoData;
    const quality = '480'; 
    const formattedViews = parseInt(views).toLocaleString('en-US');

    const info = `✰ *Información del video:*\n\n- *Título:* ${title}\n- *Duración:* ${duration || '-'}\n- *Resolución:* ${quality}p\n- *Vistas:* ${formattedViews}\n- *Link:* ${url}`;
    const exitodescarga = `*¡¡VIDEO O DOCUMENTO DESCARGADO CON ÉXITO!!*\n\n> SonGoku-Bot`;


    await conn.sendMessage(
      m.chat,
      {
        image: { url: thumbnail },
        caption: info,
      },
      { quoted: m }
    );


    const dl_url = `https://ytdownloader.nvlgroup.my.id/download?url=${queryOrUrl}&resolution=${quality}`;
    const videoResponse = await fetch(dl_url);

    if (!videoResponse.ok) {
      return conn.reply(m.chat, 'Error al descargar el video. Por favor, verifica el enlace.', m);
    }

    const videoBuffer = await videoResponse.buffer();
    const sizeInMB = videoBuffer.length / (1024 * 1024); 

    if (sizeInMB > 100) {

      await conn.sendMessage(
        m.chat,
        {
          document: videoBuffer,
          caption: exitodescarga,
          mimetype: 'video/mp4',
          fileName: `${title}.mp4`,
        },
        { quoted: m }
      );
    } else {

      await conn.sendMessage(
        m.chat,
        {
          video: videoBuffer,
          caption: exitodescarga,
          mimetype: 'video/mp4',
        },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❌ *Error:* ${error.message}`, m);
  }
};

handler.command = ['playvideo'];
handler.help = ['playvideo <búsqueda o enlace>'];
handler.tags = ['downloader'];

export default handler;