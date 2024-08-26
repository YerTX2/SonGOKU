// TheMystic-Bot-MD @BrunoSobrino - _antiprivado.js

export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`*𝐓𝐄 𝐂𝐀𝐈𝐒𝐓𝐄 𝐃𝐄 𝐋𝐀 𝐂𝐀𝐌𝐀 𝐃𝐄 𝐂𝐇𝐈𝐐𝐔𝐈𝐓@ ? 👀*\n\n*𝐍𝐨 𝐬𝐞𝐚𝐬 𝐞𝐬𝐩𝐞𝐬@ 𝐲 𝐡𝐚𝐛𝐥𝐚 𝐞𝐧 𝐞𝐥 𝐠𝐫𝐮𝐩𝐨 𝐨𝐟𝐢𝐜𝐢𝐚𝐥 𝐝𝐞 𝐒𝐡𝐚𝐧𝐚 𝐁𝐨𝐭. 🖕🏻😡.\n\nhttps://chat.whatsapp.com/F7bDm2aeYX7HnxqpYG4wIP*`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
  }
  return !1;
}
