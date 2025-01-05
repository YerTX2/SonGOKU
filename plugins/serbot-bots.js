import ws from 'ws';

async function handler(m, { usedPrefix }) {
  
  const users = [...new Set([...global.conns
    .filter((conn) => conn && conn.user && conn.ws && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED)
    .map((conn) => conn)
  ])];

  
  function dhms(ms) {
    const segundos = Math.floor(ms / 1000) % 60;
    const minutos = Math.floor(ms / (1000 * 60)) % 60;
    const horas = Math.floor(ms / (1000 * 60 * 60)) % 24;
    const días = Math.floor(ms / (1000 * 60 * 60 * 24));

    const resultado = [];
    if (días) resultado.push(`${días}d`);
    if (horas) resultado.push(`${horas}h`);
    if (minutos) resultado.push(`${minutos}m`);
    if (segundos) resultado.push(`${segundos}s`);

    return resultado.join(' ');
  }

  // Generar mensaje de respuesta
  const message = users.map((v, index) => {
    if (!v || !v.user || !v.user.jid) return ''; 
    const userJid = v.user.jid.replace(/[^0-9]/g, '');
    const userName = v.user.name || '-';
    const uptime = v.uptime ? dhms(Date.now() - v.uptime) : 'Desconocido';

    return `*\`🐉 SonGoku | Subbot: ${index + 1}\`* 
*\`Tag:\` @${userJid}*
*• wa.me/${userJid}?text=${usedPrefix}menu*
*\`👥 Nombre: ${userName}\`*
*\`⌛ Uptime: ${uptime}\`*`;
  }).filter(Boolean).join('\n\n*─ ── ──  ── ── ── ── ──  ── ── ─*\n\n'); 

  const replyMessage = message.length === 0 ? 'No hay bots activos.' : message;
  const totalUsers = users.length;
  const responseMessage = `
*\`🐉Subbots activos de SonGoku🐉: ${totalUsers || '0'}\`*

${replyMessage.trim()}

_*\`Subots SonGoku~\`*_`.trim();

  
  const gifUrl = "https://qu.ax/OpjSc.mp4"; 
  await conn.sendMessage(
    m.chat,
    {
      video: { url: gifUrl },
      gifPlayback: true, 
      caption: responseMessage,
      mentions: conn.parseMention(responseMessage), 
    },
    { quoted: m } 
  );
}

handler.help = ['botlist'];
handler.tags = ['bebot'];
handler.command = ['listbot', 'listbots', 'bots', 'bebots', 'botlist'];

export default handler;
