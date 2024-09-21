let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Debes proporcionar el nombre de una aplicación para buscar.\nEjemplo:\n${usedPrefix + command} WhatsApp`;

    try {
        await m.reply(`🐉孫ՏᴏɴᏀᴏᴋᴜ孫🐉 Buscando la aplicación "${text}"...`);

        let res = await fetch(`https://api.diego-ofc.site/v2/apk-dl?text=${encodeURIComponent(text)}`);
        if (!res.ok) throw `🚩 Error en la respuesta de la API: ${res.status}`;

        let json = await res.json();
        // Asegúrate de acceder correctamente a la propiedad de la aplicación
        if (!json.name || !json.dllink || !json.icon) throw `🚩 No se encontraron aplicaciones relacionadas con "${text}".`;
let nombre = json.name;
        let package2 = json.package
        let link = json.dllink;
        let imageUrl = json.icon;
        let lastupdate2 = json.lastUpdate;
        let icono2 = json.icon
        let caption = `*Nombre:* ${nombre}\n`;
       caption += `*package*: ${package2}\n`
        caption += `*Enlace:* ${link}\n`;
       caption+=  `*icono:*  ${icono2}\n`
        caption += `*Lasupdate:* ${lastupdate2}\n`
        caption += `*Descargando APK 🐉孫ՏᴏɴᏀᴏᴋᴜ孫🐉.*`;

        await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: caption }, { quoted: m });

        // No necesitas volver a hacer un fetch en el link, ya que es un enlace directo
        await conn.sendMessage(m.chat, { document: { url: link }, mimetype: 'application/vnd.android.package-archive', fileName: `${nombre}.apk`, caption: null }, { quoted: m });

    } catch (e) {
        console.error(e);
        throw `🐉 Hubo un error al buscar o descargar la aplicación "${text}": ${e.message || e}`;
    }
}

handler.help = ['apk'].map(v => v + ' <nombre de la aplicación>');
 handler.tags = ['downloader'] 
handler.command = /^(apk|apkd|apkdownload)$/i;

export default handler;