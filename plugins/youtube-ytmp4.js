case 'play2': {
const yts = require("youtube-yts");
if (global.db.data.users[m.sender].registered < true) return reply(info.registra);
if (!isGroupAdmins) return;
if (!text) return conn.sendMessage(from, { text: `*🚩 ${lenguaje.sms.text}*\n${prefix + command} ozuna` }, { quoted: msg });
m.react("⌛");
const videoSearch = await yts(text);
if (!videoSearch.all.length) {
return m.react("❌");
}
const vid = videoSearch.all[0];
const videoUrl = vid.url;
const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();

if (!delius.status) {
return m.react("❌")}
const downloadUrl = delius.data.download.url;
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: `↻ ◁ II ▷ ↺`}, {quoted: m})
m.react("✅")}
break