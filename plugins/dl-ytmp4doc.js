//Código modificado por YerTX2 🇦🇱para que haga descargar en DOCUMENTO NO SEAS RATA NO BORRES 🦁


import fetch from 'node-fetch';

let HS = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `❀ Ingresa el enlace de un video de YouTube`, m);
  }

  try {
    let calidad = '360';

    let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp4q?apikey=gifted&quality=${calidad}&url=${encodeURIComponent(text)}`);
    let json = await api.json();

    if (!json.result || !json.result.download_url) {
      return conn.reply(m.chat, "❌ No se pudo obtener el enlace de descarga. Verifica el enlace y vuelve a intentarlo.", m);
    }

    let { quality, title, download_url } = json.result;

    let safeTitle = title ? title.replace(/[<>:"/\\|?*]+/g, "") : "video";

    await conn.reply(m.chat, "⏳ Procesando tu video en documento, por favor espera...", m);

    await conn.reply(m.chat, "📤 Enviando tu video como documento, por favor espera un momento...", m);

    await conn.sendMessage(
      m.chat,
      {
        document: { url: download_url },
        caption: `🎥 *Título*: ${title || "Sin título"}\n📹 *Calidad*: ${quality || calidad}`,
        mimetype: "video/mp4",
        fileName: `${safeTitle}.mp4`,
      },
      { quoted: m }
    );

    await conn.reply(m.chat, "✅ Video enviado con éxito. ¡Disfrútalo!", m);

  } catch (error) {
    console.error("Error procesando el video:", error);
    return conn.reply(m.chat, "❌ Ocurrió un error al procesar tu solicitud. Por favor, intenta más tarde.", m);
  }
};

HS.command = /^(ytmp4doc)$/i;

export default HS;
