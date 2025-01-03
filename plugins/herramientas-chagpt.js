import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import {Configuration, OpenAIApi} from 'openai';
const configuration = new Configuration({organization: global.openai_org_id, apiKey: global.openai_key});
const openaiii = new OpenAIApi(configuration);
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (usedPrefix == 'a' || usedPrefix == 'A') return;
if (!text) return m.reply(`*Hola, ¿Cómo estás? ¿En qué te puedo ayudar?* Ingrese una petición o orden para usar este comando\n*Ejemplo:*\n${usedPrefix + command} Dime 10 nombres aleatorios`) 
let syst = `Actuaras como un Bot de WhatsApp el cual fue creado por YerTX2, tu seras SonGoku.`

if (command == 'ia' || command == 'chatgpt') {
try {     
await conn.sendPresenceUpdate('composing', m.chat)

async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: true // true = resultado con url
});
return response.data.result;
} catch (error) {
console.error('Error al obtener:', error);
}}

let query = m.text;
let username = `${m.pushName}`;
let syms1 = await fetch('https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/main/src/text-chatgpt.txt').then(v => v.text());

let result = await luminsesi(query, username, syms1);
 await m.reply(result)
} catch {
try {
let gpt = await fetch(`https://apidelirius.duckdns.org/ia/gptweb?text=${text}`) 
let res = await gpt.json()
await m.reply(res.gpt)
/*let gpt = await fetch(`https://deliriusapi-official.vercel.app/ia/chatgpt?q=${text}`)
let res = await gpt.json()
await m.reply(res.data)*/
} catch {
}}}

if (command == 'openai' || command == 'ia2' || command == 'chatgpt2') {
conn.sendPresenceUpdate('composing', m.chat);
let gpt = await fetch(`https://apidelirius.duckdns.org/api/ia2?text=${text}`)
let res = await gpt.json()
await m.reply(res.gpt)
}

if (command == 'gemini') {
let gpt = await fetch(`https://deliriussapi-oficial.vercel.app/ia/gemini?query=${text}`)
let res = await gpt.json()
await m.reply(res.message)
}

if (command == 'bing' || command == 'bing') {
let gpt = await fetch(``)
let res = await gpt.json()
await m.reply(res.message)
}}
handler.help = ["chagpt", "ia", "openai", "gemini", "copilot"]
handler.tags = ["inteligencia artificial🤖"]
handler.command = /^(openai|chatgpt|ia|ai|openai2|chatgpt2|ia2|gemini|copilot|bing)$/i;
export default handler;