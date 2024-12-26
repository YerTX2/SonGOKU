import { exec } from 'child_process';

let handler = async (m, { conn }) => {
  try {
    await m.react('🕓');
    
    
    exec('speedtest --accept-license --accept-gdpr -f json', async (error, stdout, stderr) => {
      if (error) {
        await conn.reply(m.chat, 'Hubo un error al ejecutar el speedtest.', m);
        await m.react('✖️');
        return;
      }

      try {
        let result = JSON.parse(stdout);

        let serverName = result.server?.name || 'Desconocido';
        let serverLocation = result.server?.location || 'Desconocida';
        let ping = result.ping?.latency ? `${result.ping.latency} ms` : 'No disponible';
        let downloadSpeed = result.download?.bandwidth
          ? `${(result.download.bandwidth / 125000).toFixed(2)} Mbit/s`
          : 'No disponible';
        let uploadSpeed = result.upload?.bandwidth
          ? `${(result.upload.bandwidth / 125000).toFixed(2)} Mbit/s`
          : 'No disponible';

        let txt = '`乂  S P E E D - T E S T`\n\n';
        txt += `        ✩   *Hosted By* : ${serverName}\n`;
        txt += `        ✩   *Ubicación* : ${serverLocation}\n`;
        txt += `        ✩   *Ping* : ${ping}\n`;
        txt += `        ✩   *Speed Descarga* : ${downloadSpeed}\n`;
        txt += `        ✩   *Speed Subida* : ${uploadSpeed}\n\n`;
        txt += `> 🚩 ${textbot}`;

        await conn.reply(m.chat, txt, m);
        await m.react('✅');
      } catch (parseError) {
        await conn.reply(m.chat, 'Error al procesar los resultados del speedtest.', m);
        await m.react('✖️');
      }
    });
  } catch {
    await m.react('✖️');
  }
};
handler.help = ['speedtest'];
handler.tags = ['main'];
handler.command = ['speedtest', 'testspeed'];

export default handler;
