import fetch from 'node-fetch';
import yts from "yt-search";
import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;
import FormData from "form-data";
import Jimp from "jimp";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`• *Ejemplo:* ${usedPrefix + command} SonGoku épico momentos`);

    await m.reply('*_`Buscando espere un momento`_*');

    async function createImage(img) {
        const { imageMessage } = await generateWAMessageContent({
            image: img
        }, {
            upload: conn.waUploadToServer
        });
        return imageMessage;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let push = [];
    let results = await yts(text);
    let videos = results.videos.slice(0, 8); // Ambil 8 hasil teratas
    shuffleArray(videos); // Mengacak hasil video

    let i = 1;
    for (let video of videos) {
        let imageUrl = video.thumbnail;
        let imageK = await fetch(imageUrl);
        let imageB = await imageK.buffer();
      let pr = await remini(imageB, "enhance")
        push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `🎬 *Título:* ${video.title}\n⌛ *Duración:* ${video.timestamp}\n👀 *Vistas:* ${video.views}\n🔗 *Link:* ${video.url}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: '乂 Y O U T U B E' // Sesuaikan dengan watermark Anda
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `Video - ${i++}`,
                hasMediaAttachment: true,
                imageMessage: await createImage(pr) // Thumbnail video
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({

buttons: [
                    {"buttonParamsJson": `       [['Canal', 'https://whatsapp.com/channel/0029Vaj67qQJUM2Wa5Ey3y1v']], m);
               }
                ]
            })
        });
    }
    const bot = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "Resultados de la búsqueda completos..."
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: '乂 Y O U T U B E' // Sesuaikan dengan watermark Anda
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false
                    }),
                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                        cards: [...push] // Mengisi carousel dengan hasil video
                    })
                    
                })
            }
        }
    }, {});

    await conn.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
}
handler.help = ['ytsearch <búsqueda>']
handler.tags = ['search']
handler.command = ["ytsearch"];

export default handler;

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"]
    if (availableOperations.includes(operation)) {
      operation = operation
    } else {
      operation = availableOperations[0]
    }
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro"
    const formData = new FormData()
    formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"})
    formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"})
    formData.submit({url: baseUrl, host: "inferenceengine.vyro.ai", path: "/" + operation, protocol: "https:", headers: {"User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip"}},
      function (err, res) {
        if (err) reject(err);
        const chunks = [];
        res.on("data", function (chunk) {chunks.push(chunk)});
        res.on("end", function () {resolve(Buffer.concat(chunks))});
        res.on("error", function (err) {
        reject(err);
        });
      },
    )
  })
}