import Starlights from '@StarlightsTeam/Scraper';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Manejo para TikTok
    if (command === 'tiktok' || command === 'ttdl' || command === 'tiktokdl' || command === 'tiktoknowm') {
        if (!args || !args[0]) {
            return conn.reply(
                m.chat,
                `🚩 *Ingresa un enlace del video de TikTok junto al comando.*\n\n*Ejemplo:*\n${usedPrefix + command} https://vm.tiktok.com/ZMrFCX5jf/`,
                m
            );
        }

        if (!args[0].match(/tiktok/gi)) {
            await m.react('✖️');
            return conn.reply(m.chat, '❌ *Verifica que el enlace sea de TikTok.*', m);
        }

        await m.react('🕓');

        try {
            const { title, author, duration, views, likes, comment, share, published, downloads, dl_url } = 
                await Starlights.tiktokdl(args[0]);

            const txt = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        ✨  *TIKTOK - DESCARGA*  ✨
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
➤  *Título:*  ${title}
➤  *Autor:*   ${author}
➤  *Duración:* ${duration} segundos
➤  *Vistas:*  ${views}
➤  *Likes:*   ${likes}
➤  *Comentarios:* ${comment}
➤  *Compartidos:* ${share}
➤  *Publicado:* ${published}
➤  *Descargas:* ${downloads}
        
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 (🚩 *¡Disfruta tu video con ${textbot}!* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `.trim();

            await conn.reply(m.chat, '🚀 *Tu video está siendo enviado...*', m, rcanal);

            await conn.sendFile(m.chat, dl_url, 'tiktok.mp4', txt, m);

            await m.react('✅');
        } catch (error) {
            console.error(error);
            await m.react('✖️');
            conn.reply(m.chat, '❌ *Hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.*', m);
        }
    }

handler.help = ['tiktok *<url tt>*', 'rcanal *<url canal>*'];
handler.tags = ['downloader'];
handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm|rcanal)$/i;
handler.group = true;
handler.limit = 1;

export default handler;
