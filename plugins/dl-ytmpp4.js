
//CÓDIGO MODIFICADO POR DV.YER🇦🇱 NO SEAS CABRO NO QUITES LOS DERECHOS ↩️
//Código de Bot (SonGoku) 

import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `🦁 Ingresa un enlace de YouTube.`, m);

  let maxRetries = 4; 
  let attempt = 0;
  let success = false;


  await conn.reply(
    m.chat,
    `⏳ Descargando el video... Si ocurre un error, se intentará hasta ${maxRetries} veces. Por favor, espera.`,
    m
  );

  while (attempt < maxRetries && !success) {
    try {

      let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${encodeURIComponent(text)}`);
      let json = await api.json();

      if (!json || !json.data || !json.data.download || !json.data.download.url) {
        throw new Error('No se pudo obtener el enlace de descarga. Verifica el enlace.');
      }

      let title = json.data.metadata.title || "Sin título";
      let dl_url = json.data.download.url;
      let fileName = json.data.filename || "video";


      await conn.reply(m.chat, `📤 Enviando el video...`, m);


      await conn.sendMessage(
        m.chat,
        {
          video: { url: dl_url },
          caption: `🎥 *Título*: ${title}`,
          fileName: `${fileName}.mp4`,
          mimetype: "video/mp4",
        },
        { quoted: m }
      );

      // Confirmar que el video ha sido enviado
      await conn.reply(m.chat, `✅ Video enviado correctamente.`, m);
      success = true; 

    } catch (error) {
      console.error(error);
      attempt++;
    }
  }

  if (!success) {

    await conn.reply(
      m.chat,
      `❌ No se pudo descargar y enviar el video después de ${maxRetries} intentos. Por favor, verifica el enlace e inténtalo nuevamente más tarde.`,
      m
    );
  }
};


HS.command = ['ytmp6'];
// handler.group =  true;
// handler.limit = 3;

export default HS;