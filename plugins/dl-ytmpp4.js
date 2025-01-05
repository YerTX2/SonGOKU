import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `🦁 Ingresa un enlace de YouTube.`, m);

  try {
    // Advertir al usuario que se está procesando la descarga
    await conn.reply(m.chat, `⏳ Descargando el video... Por favor, espera.`, m);

    // Llamada a la API
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${encodeURIComponent(text)}`);
    let json = await api.json();

    if (!json || !json.data || !json.data.download || !json.data.download.url) {
      return conn.reply(m.chat, `❌ No se pudo obtener el enlace de descarga. Verifica el enlace y vuelve a intentarlo.`, m);
    }

    let title = json.data.metadata.title || "Sin título";
    let dl_url = json.data.download.url;
    let fileName = json.data.filename || "video";

    // Advertir al usuario que se está enviando el video
    await conn.reply(m.chat, `📤 Enviando el video...`, m);

    // Enviar el video al usuario
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

  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, `❌ Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.`, m);
  }
};

// Configuración del comando
HS.command = ['ytmp6'];
// handler.group = true;
// handler.limit = 3;

export default HS;
