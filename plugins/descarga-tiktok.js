import Starlights from '@StarlightsTeam/Scraper';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args || !args[0]) {
        return conn.reply(
            m.chat, 
            '🚩 *Ingresa un enlace del vídeo de TikTok junto al comando.*\n\n`Ejemplo:`\n' + 
            `> *${usedPrefix + command}* https://vm.tiktok.com/ZMrFCX5jf/`, 
            m, 
            rcanal
        );
    }

    if (!args[0].match(/tiktok/gi)) {
        return conn.reply(
            m.chat, 
            '⚠️ *Verifica que el link sea de TikTok.*', 
            m, 
            rcanal
        ).then(() => m.react('✖️'));
    }

    await m.react('🕓');

    try {
        let { title, author, duration, views, likes, comment, share, published, downloads, dl_url } = await Starlights.tiktokdl(args[0]);

        let txt = '📥 *TIKTOK VIDEO DESCARGADO*\n\n';
        txt += `🎥 *Título*: ${title}\n`;
        txt += `👤 *Autor*: ${author}\n`;
        txt += `⏱️ *Duración*: ${duration} segundos\n`;
        txt += `👁️ *Vistas*: ${views}\n`;
        txt += `❤️ *Likes*: ${likes}\n`;
        txt += `💬 *Comentarios*: ${comment}\n`;
        txt += `🔄 *Compartidos*: ${share}\n`;
        txt += `📅 *Publicado*: ${published}\n`;
        txt += `⬇️ *Descargas disponibles*: ${downloads}\n\n`;
        txt += `🔗 *Generado por*: ${textbot}\n\n`;

        await conn.reply(m.chat, '⚠️ *Se está enviando el video, por favor espera...*', m, rcanal);

        await conn.sendFile(
            m.chat, 
            dl_url, 
            'tiktok.mp4', 
            txt, 
            m, 
            null, 
            rcanal
        );

        await conn.reply(m.chat, '✅ *Video enviado exitosamente.*', m, rcanal);
        await m.react('✅');
    } catch {
        await m.react('✖️');
        await conn.reply(m.chat, '❌ *Error al procesar el video. Intenta de nuevo más tarde.*', m, rcanal);
    }
};

handler.help = ['tiktok *<url tt>*'];
handler.tags = ['downloader'];
handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm)$/i;
handler.group = true;
handler.limit = 1;

export default handler;