//CÓDIGO MODIFICADO POR DV.YER🇦🇱 NO SEAS CABRO NO QUITES LOS DERECHOS ↩️
//Código de (SonGoku) Bot 


import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      '*❌ Error:* Por favor, proporciona un enlace válido de YouTube para descargar el video.',
      m
    );
  }

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  if (!youtubeRegex.test(text)) {
    return conn.reply(
      m.chat,
      '*❌ Error:* El enlace proporcionado no parece ser válido. Asegúrate de que sea un enlace de YouTube.',
      m
    );
  }

  let maxRetries = 4; 
  let attempt = 0;
  let success = false;

  await conn.reply(
    m.chat,
    `⏳ *Descargando video en calidad 360p...*\nSi ocurre un error, se intentará hasta ${maxRetries} veces. Por favor, espera.`,
    m
  );

  while (attempt < maxRetries && !success) {
    try {
      
      let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${text}&quality=360`);
      if (!api.ok) throw new Error('No se pudo obtener una respuesta de la API.');

      let json = await api.json();
      if (!json.data || !json.data.download) {
        throw new Error('No se pudo obtener los datos del video. Verifica el enlace.');
      }

      let title = json.data.metadata.title || 'Sin título';
      let dl_url = json.data.download.url;

      await conn.reply(
        m.chat,
        '📤 *Enviando video en calidad 360p...*\nEsto puede tardar unos momentos dependiendo del tamaño del archivo.',
        m
      );

      
      await conn.sendMessage(
        m.chat,
        {
          document: { url: dl_url },
          fileName: `${title} (360p).mp4`,
          mimetype: 'video/mp4',
        },
        { quoted: m }
      );

      conn.reply(
        m.chat,
        `✅ *Video enviado con éxito:*\n*Título:* ${title}\n*Calidad:* 360p\nGracias por usar el servicio.`,
        m
      );

      success = true; 
    } catch (error) {
      console.error(error);
      attempt++;
    }
  }

  if (!success) {
    conn.reply(
      m.chat,
      `❌ *Error:* No se pudo descargar y enviar el video después de ${maxRetries} intentos.\nPor favor, verifica el enlace e inténtalo nuevamente más tarde.`,
      m
    );
  }
};

HS.command = ['ytmp4doc'];

export default HS;