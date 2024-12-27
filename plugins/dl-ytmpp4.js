import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let queryOrUrl = text.trim(); // Obtener la consulta o enlace
    if (!queryOrUrl) {
      return conn.reply(
        m.chat,
        `Ingresa un *enlace* de YouTube o un *término de búsqueda*.\n\n*Ejemplo:*\n${usedPrefix + command} Never Gonna Give You Up\n${usedPrefix + command} https://youtu.be/dQw4w9WgXcQ`,
        m
      );
    }

    let videoData;

    // Comprobar si es un enlace de YouTube
    if (queryOrUrl.startsWith('http')) {
      let apiinfo = await fetch(`https://ytdownloader.nvlgroup.my.id/info?url=${queryOrUrl}`);
      videoData = await apiinfo.json();
    } else {
      // Búsqueda por texto
      const searchResults = await yts(queryOrUrl);
      if (!searchResults.videos.length) {
        return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
      }
      let firstVideo = searchResults.videos[0];
      queryOrUrl = firstVideo.url;
      let apiinfo = await fetch(`https://ytdownloader.nvlgroup.my.id/info?url=${queryOrUrl}`);
      videoData = await apiinfo.json();
    }

    let { title, duration, thumbnail, views, url } = videoData;
    let quality = '480'; // Resolución fija a 480p
    let formattedViews = parseInt(views).toLocaleString('en-US');

    
    let infoMessage = `✰ *Información del video:*\n\n- *Título:* ${title}\n- *Duración:* ${duration || '-'}\n- *Resolución:* ${quality}p\n- *Vistas:* ${formattedViews}\n- *Link:* ${url}`;

    let MensajeTerm = `*¡¡ARCHIVO DESCARGADO CON ÉXITO!!*\n\n> SonGoku-Bot`

    // Enviar información del video al usuario
    await conn.sendMessage(
      m.chat,
      {
        image: { url: thumbnail },
        caption: infoMessage,
      },
      { quoted: m }
    );

    // Descargar el video en resolución 480p
    let dl_url = `https://ytdownloader.nvlgroup.my.id/download?url=${queryOrUrl}&resolution=${quality}`;
    let vidFetch = await fetch(dl_url);

    if (!vidFetch.ok) {
      return conn.reply(m.chat, 'Error al descargar el video. Por favor, verifica el enlace.', m);
    }

    let videoBuffer = await vidFetch.buffer();
    let Tamaño = videoBuffer.length / (1024 * 1024); // Tamaño en MB

    if (Tamaño > 100) {
      await conn.sendMessage(
        m.chat,
        { document: videoBuffer, caption: MensajeTerm, mimetype: 'video/mp4', fileName: `${title}.mp4` },
        { quoted: m }
      );
    } else {
      await conn.sendMessage(
        m.chat,
        { video: videoBuffer, caption: infoMessage, mimetype: 'video/mp4' },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `Error: ${error.message}`, m);
  }
};

handler.command = ['playvideo']; // Comandos disponibles
handler.help = ['playvideo <búsqueda o enlace>'];
handler.tags = ['downloader'];

export default handler;