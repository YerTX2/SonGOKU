//Derechos del código de 
/* 
*❀ By Jtxs*
[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

//Código modificado por YerTX2 🇦🇱para que haga descargar en DOCUMENTO y Opciones de calidad NO SEAS RATA NO BORRES  🦁


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

  try {
    let downloadMessage = await conn.reply(
      m.chat,
      '⏳ *Descargando video...*\nPor favor, espera mientras procesamos tu solicitud.',
      m
    );

    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${text}&quality=360`);
    if (!api.ok) throw new Error('No se pudo obtener una respuesta de la API.');

    let json = await api.json();
    if (!json.data || !json.data.download) {
      throw new Error('No se pudo obtener los datos del video. Verifica el enlace.');
    }

    let title = json.data.metadata.title;
    let dl_url = json.data.download.url;

    await conn.reply(
      m.chat,
      '📤 *Enviando video...*\nEsto puede tardar unos momentos dependiendo del tamaño del archivo.',
      m
    );

    await conn.sendMessage(
      m.chat,
      {
        document: { url: dl_url },
        fileName: `${title}.mp4`,
        mimetype: 'video/mp4',
      },
      { quoted: m }
    );

    conn.reply(
      m.chat,
      `✅ *Video enviado con éxito:*\n*Título:* ${title}\nGracias por usar el servicio.`,
      m
    );
  } catch (error) {
    console.error(error);
    conn.reply(
      m.chat,
      `❌ *Error al procesar tu solicitud:*\n${error.message}\nPor favor, intenta de nuevo más tarde.`,
      m
    );
  }
};

HS.command = ['ytmp4doc'];

export default HS;
