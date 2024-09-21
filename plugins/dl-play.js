import yts from 'yt-search';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) {
        return conn.reply(m.chat, '*Que quieres que busque 🐉孫ՏᴏɴᏀᴏᴋᴜ孫🐉*', m);
    }

    await m.react('📥');    
    let res = await yts(text);
    let play = res.videos[0];

    if (!play) {
        throw `Error: Vídeo no encontrado`;
    }

    let { title, thumbnail, ago, timestamp, views, videoId, url } = play;

    let txt = '```·:*¨✘𝚈𝚘𝚞𝚃𝚞𝚋𝚎 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚜✘¨*:·```\n';
    txt += ' \n';
    txt += `*乂✮Titulo✮乂*
     : _${title}_\n`;
    txt += `*乂✮Creado✮乂*
: _${ago}_\n`;
    txt += `*乂✮Duracion✮乂*
 : _${timestamp}_\n`;
    txt += `*乂✮Visitas✮乂* 
: _${views.toLocaleString()}_\n`;
    txt += `*乂✮Link✮乂*`  
: _https://www.youtube.com/watch?v=${videoId}_\n`;
   
    txt += 'Selecciona un método de descarga\n';
    txt += '孫ՏᴏɴᏀᴏᴋᴜ孫';

    await conn.sendButton2(m.chat, txt, '. ', thumbnail, [
        ['MP3', `${usedPrefix}ytmp3 ${url}`],
        ['MP3DOC', `${usedPrefix}ytmp3doc ${url}`],
        ['MP4', `${usedPrefix}ytmp4 ${url}`], 
        ['MP4DOC', `${usedPrefix}ytmp4doc ${url}`]
        ], null, [['Canal', 'https://whatsapp.com/channel/0029Vaj67qQJUM2Wa5Ey3y1v']], m);

    await m.react('✅');
};

//handler.help = ['play'];
handler.tags = ['downloader'] 
handler.command = ['play',];

export default handler;
