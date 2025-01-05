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


//Código modificado por YerTX2 🇦🇱 con advertencias de descarga 

import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `🦁 Ingresa un enlace de YouTube.`, m);

  try {
    
    await conn.reply(m.chat, `⏳ Descargando el video... Por favor, espera.`, m);

   
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${encodeURIComponent(text)}`);
    let json = await api.json();

    if (!json || !json.data || !json.data.download || !json.data.download.url) {
      return conn.reply(m.chat, `❌ No se pudo obtener el enlace de descarga. Verifica el enlace y vuelve a intentarlo.`, m);
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

 
    await conn.reply(m.chat, `✅ Video enviado correctamente.`, m);

  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, `❌ Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.`, m);
  }
};

HS.command = ['ytmp6'];
export default HS;
