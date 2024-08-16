import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw `🐉 INGRESE EL ENLACE 🐉`;
    if (!args[0].match(/mediafire/gi)) throw `⚠️ Enlace incorrecto`;

    m.react('🐉'); 

    const getDownloadDetails = async (url) => {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            const downloadLink = $('a[aria-label="Download file"]').attr('href');
            const fileName = $('.filename').text().trim();

            if (downloadLink && fileName) {
                return { downloadLink, fileName };
            } else {
                throw new Error('𝙽𝚘 𝚜𝚎 𝚙𝚞𝚍𝚘 𝚎𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚛 𝚎𝚕 𝚎𝚗𝚕𝚊𝚌𝚎 𝚍𝚎 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊 𝚘 𝚎𝚕 𝚗𝚘𝚖𝚋𝚛𝚎 𝚍𝚎𝚕 𝚊𝚛𝚌𝚑𝚒𝚟𝚘');
            }
        } catch (error) {
            console.error('Error durante el proceso:', error);
            return null;
        }
    };

    let url = args[0];
    let details = await getDownloadDetails(url);

    if (!details) throw `𝙴𝚛𝚛𝚘𝚛 𝚊𝚕 𝚘𝚋𝚝𝚎𝚗𝚎𝚛 𝚎𝚕 𝚎𝚗𝚕𝚊𝚌𝚎 𝚍𝚎 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊.`;

    let response = {
        success: true,
        creator: "Gabriel Curi",
        title: details.fileName,
        downloadLink: details.downloadLink,
    };

    let caption = `
╭────〈 *MEDIAFIRE* 〉────
│
│ ├── >𝙽𝙾𝙼𝙱𝚁𝙴: ${response.title}
│ ├── >𝙴𝙽𝙻𝙰𝙲𝙴 𝙳𝙴 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰: ${response.downloadLink}
│ ├── >🌀░S░o░n░G░o░k░u🌀
╰─────────────────────
    `.trim();

    const imageUrl = "https://telegra.ph/file/b09e343ef667887945c0a.jpg";
    const responseImg = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    await conn.sendFile(m.chat, responseImg.data, "thumbnail.png", caption, m);

    await conn.sendFile(m.chat, details.downloadLink, response.title, '', m);

    m.react('✔️'); 
};

handler.help = ['mediafire <url>'];
handler.tags = ['downloader'];
handler.command = ['mediafire', 'mfire'];
handler.register = true;
handler.premium = false;

export default handler;
