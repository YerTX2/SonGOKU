import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import {mediafiredl} from '@bochilteam/scraper';

const handler = async (m, {conn, args, usedPrefix, command}) => {
  if (!args[0]) throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝚄𝙽 𝙴𝙽𝙻𝙰𝙲𝙴 𝚅𝙰𝙻𝙸𝙳𝙾 𝙳𝙴 𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝚁𝙴, 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: ${usedPrefix + command} https://www.mediafire.com/file/r0lrc9ir5j3e2fs/DOOM_v13_UNCLONE*`;
  try {
    const resEX = await mediafiredl(args[0]);
    const captionES = `
*𖤍 𝑁𝑂𝑀𝐵𝑅𝐸:* ${resEX.filename}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*𖤍 𝑃𝐸𝑆𝑂:* ${resEX.filesizeH}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*𖤍 𝑇𝐼𝑃𝑂:* ${resEX.ext}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*⏳ 𝙴𝚂𝙿𝙴𝚁𝙴 𝙴𝙽 𝙻𝙾 𝚀𝚄𝙴 𝙴𝙽𝚅𝙸𝙾 𝚂𝚄 𝙰𝚁𝙲𝙷𝙸𝚅𝙾. . . .* 
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
`.trim();
    m.reply(captionES);
    await conn.sendFile(m.chat, resEX.url, resEX.filename, '', m, null, {mimetype: resEX.ext, asDocument: true});
  } catch {
    try {
      const res = await mediafireDl(args[0]);
      const {name, size, date, mime, link} = res;
      const caption = `
*📓 𝑁𝑂𝑀𝐵𝑅𝐸:* ${name}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*📁 𝑃𝐸𝑆𝑂:* ${size}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*📄 𝑇𝐼𝑃𝑂:* ${mime}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*⏳ 𝐸𝑆𝑃𝐸𝑅𝐸 𝐸𝑁 𝐿𝑂 𝑄𝑈𝐸 𝐸𝑁𝑉𝐼𝑂 𝑆𝑈 𝐴𝑅𝐶𝐻𝐼𝑉𝑂. . . .* 
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
`.trim();
      await m.reply(caption);
      await conn.sendFile(m.chat, link, name, '', m, null, {mimetype: mime, asDocument: true});
    } catch {
      await m.reply('*[INFORMACIÓN] 𝐸𝑅𝑅𝑂𝑅, 𝑃𝑂𝑅 𝐹𝐴𝑉𝑂𝑅 𝑉𝑈𝐸𝐿𝑉𝐴 𝐴 𝐼𝑁𝑇𝐸𝑁𝑇𝐴𝑅𝐿𝑂*\n\n*- 𝐶𝑂𝑅𝑅𝑂𝐵𝑂𝑅𝐸 𝑄𝑈𝐸 𝐸𝐿 𝐸𝑁𝐿𝐴𝐶𝐸 𝑆𝐸𝐴 𝑆𝐼𝑀𝐼𝐿𝐴𝑅 𝐴:*\n*➳ https://www.mediafire.com/file/r0lrc9ir5j3e2fs/DOOM_v13_UNCLONE*');
    }
  }
};
handler.help = ['mediafire'].map(v => v + ' *<url>*')
handler.tags = ["Descargas de archivos"]
handler.command = ['mediafire', 'mdfire', 'mf']
handler.premium = true
export default handler;

async function mediafireDl(url) {
  const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/', '')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
  const $ = cheerio.load(res.data);
  const link = $('#downloadButton').attr('href');
  const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ', '').replaceAll('\n', '');
  const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
  const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ', '');
  let mime = '';
  const rese = await axios.head(link);
  mime = rese.headers['content-type'];
  return {name, size, date, mime, link};
}