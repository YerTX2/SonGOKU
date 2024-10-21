const axios = require('axios');

async function ttsanzy(url) {
  try {
    const response = await axios.post('https://tikdown.xyz/api/download', {
      url: url
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://tikdown.xyz/'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching TikTok video:', error);
    throw error;
  }
}


return ttsanzy('https://vt.tiktok.com/ZSje1Vkup/')
handler.help = ['tiktok <url tt>']
handler.tags = ['downloader']
handler.command = ['tiktok', 'ttdl', 'tiktokdl', 'tiktoknowm']
handler.register = true

export default handler
