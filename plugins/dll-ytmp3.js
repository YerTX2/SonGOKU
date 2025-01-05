import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `🐉 Por favor, envia un link de Youtube para descargar su audio.`, m);

    try {
        await conn.reply(m.chat, `《⏳》Descargando su audio, por favor espera un momento...`, m);

        let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`);
        let json = await api.json();
        let title = json.result.metadata.title;
        let dl_url = json.result.download.url;

        await conn.sendMessage(m.chat, { 
            audio: { url: dl_url }, 
            fileName: `${title}.mp3`, 
            mimetype: 'audio/mp4' 
        }, { quoted: m });

        await conn.reply(m.chat, `《✅》Su audio fue enviado con éxito. ¡Disfrútalo!`, m);

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, `《❌》Ocurrió un error al intentar descargar el audio. Por favor, verifica el enlace e inténtalo nuevamente.`, m);
    }
};

HS.command = ['ytmp3', 'fgmp3', 'yta'];

export default HS;