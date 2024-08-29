import fs from 'fs';

let handler = async (m, { conn }) => {
  let text = m.text.toLowerCase(); 
  let user = global.db.data.users[m.sender];

  const audioMap = {
    'linda': './goku/hdpta.mp3',
    'sin sentimiento': './goku/elcorazon.mp3',
    'elcorazone': './goku/elcorazon.mp3',
    'ayuda': './goku/ayuda.mp3',
    'gey': './goku/gey.mp3'
    'negra': './goku/negra.mp3'
    'callate': './goku/callate.mp3'
    'super albañil': './goku/super albañil.mp3'
    'peruano': './goku/peruano.mp3'
    'viva venezuela': './goku/viva venezuela.mp3'
    
  };

  for (let key in audioMap) {
    if (text.includes(key)) {
      try {
        if (fs.existsSync(audioMap[key])) {
          await conn.sendFile(m.chat, audioMap[key], `${key}.mp3`, '', m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument });
        } else {
          m.reply('El audio correspondiente no se encontró.');
        }
      } catch (err) {
        console.error(err);
        m.reply('Ocurrió un error al intentar enviar el audio.');
      }
      break;
    }
  }
};

handler.help = ['ayuda', 'gey', 'ayuda', 'elcorazon', 'sin sentimiento', 'linda', 'negra', 'callate', 'super albañil',
'peruano', 'viva venezuela']
handler.customPrefix = /^(hola|cómo estás|goku|gey|si te mueves|ayuda|sin sentimiento|linda|negra|eres tu|callate|super albañil|peruano|viva venezuela|)/i;
handler.command = new RegExp;
handler.tags = ['Audios Dbz'] 
export default handler;