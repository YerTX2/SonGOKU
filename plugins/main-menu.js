import yts from 'yt-search';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) {
        return conn.reply(m.chat, '*Que quieres que busque 🐉孫ՏᴏɴᏀᴏᴋᴜ孫🐉*', m);
    }

    await m.react('⏳');
    let res = await yts(text);
    let play = res.videos[0];

    if (!menu) {
        throw `Error: Vídeo no encontrado`;
    }

    let { title, thumbnail, ago, timestamp, views, videoId, url } = play;

    
    
    await conn.sendButton2(m.chat, txt, '. ', thumbnail, [
        ['MP3🎵', `${usedPrefix}ytmp3 ${url}`],
        ['MP3DOC🎵📄', `${usedPrefix}ytmp3doc ${url}`],
        ['MP4📹', `${usedPrefix}ytmp4 ${url}`], 
        ['MP4DOC📹📄', `${usedPrefix}ytmp4doc ${url}`], 
        ['MOSTRAR MÁS VÍDEOS', `${usedPrefix}ytsearch ${url}`]
        ], null, [['Canal', 'https://whatsapp.com/channel/0029Vaj67qQJUM2Wa5Ey3y1v']], m);

    await m.react('✅');
};

handler.help = ['menu'];
handler.tags = ['menu'] 
handler.command = ['menu',];

export default handler;
