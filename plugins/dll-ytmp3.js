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

//Código modificado por YerTX2🇦🇱 agregado advertencia de descarga no borres no seas rata 



import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("🦁🔥 Ingresa un enlace de YouTube válido.");
  }

  try {
    
    await m.reply("⏳ Procesando tu audio, por favor espera...");

    
    let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${text}`);
    let json = await api.json();

    // Validación de la respuesta de la API
    if (!json.result || !json.result.download_url) {
      return m.reply("❌ No se pudo obtener un enlace de descarga. Por favor, verifica el enlace y vuelve a intentarlo.");
    }

    let { quality, title, download_url } = json.result;

    
    await m.reply("📤 Enviando tu audio, por favor espera...")', m, rcanal

    
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: download_url },
        fileName: `${title}.mp3`,
        mimetype: "audio/mp4",
      },
      { quoted: m }
    );

    
    await m.reply("✅ Audio enviado con éxito. ¡Disfrútalo!");

  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    return m.reply("❌ Ocurrió un error al procesar tu solicitud. Por favor, intenta más tarde.");
  }
};

// Configuración del comando
HS.command = /^(ytmp5)$/i;
// handler.group = true;
// handler.limit = 3;

export default HS;
