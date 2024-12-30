
//Código mejorado por Dv.yer🇦🇱 no seas cabro no quites los derechos🦁


import { readdirSync, unlinkSync, existsSync, promises as fs } from 'fs';
import path from 'path';

const handler = async (m, { conn }) => {
  const sessionPath = './GokuSession';
  const fileLimit = 10;


  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, { text: '⚠️ Este comando solo puede ser utilizado en el bot principal de 孫ՏᴏɴᏀᴏᴋᴜ孫.' }, { quoted: m });
  }

  await conn.sendMessage(m.chat, { text: '✅ Iniciando...' }, { quoted: m });

  try {

    if (!existsSync(sessionPath)) {
      return await conn.sendMessage(m.chat, { text: '⚠️ La carpeta de sesión de 孫ՏᴏɴᏀᴏᴋᴜ孫 no existe o está vacía.' }, { quoted: m });
    }

    const files = await fs.readdir(sessionPath);
    const totalFiles = files.length;


    if (totalFiles > fileLimit) {
      let filesDeleted = 0;

      for (const file of files) {
        if (file !== 'creds.json') { 

          await fs.unlink(path.join(sessionPath, file));
          filesDeleted++;
          if (totalFiles - filesDeleted <= fileLimit) break; 
        }
      }

      await conn.sendMessage(m.chat, {
        text: `⚠️ Se eliminaron ${filesDeleted} archivos basura automáticamente. Total de archivos ahora: ${totalFiles - filesDeleted}.`
      }, { quoted: m });
    } else {

      let filesDeleted = 0;
      for (const file of files) {
        if (file !== 'creds.json') {
          await fs.unlink(path.join(sessionPath, file));
          filesDeleted++;
        }
      }

      if (filesDeleted === 0) {
        await conn.sendMessage(m.chat, { text: '⚠️ No se encontró ningún archivo de ՏᴏɴᏀᴏᴋᴜ para eliminar en la carpeta de sesiones.' }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, { text: `✅ Se eliminaron ${filesDeleted} archivos de ՏᴏɴᏀᴏᴋᴜ manualmente.` }, { quoted: m });
      }
    }
  } catch (error) {
    console.error(error);
    await conn.sendMessage(m.chat, { text: '⚠️ Ocurrió un error al eliminar los archivos de sesión de ՏᴏɴᏀᴏᴋᴜ.' }, { quoted: m });
  }

  await conn.sendMessage(m.chat, { text: `¡Hola! ¿Ahora me ves? Att: ՏᴏɴᏀᴏᴋᴜ.` }, { quoted: m });
};

handler.tags = ['owner'];
handler.help = ['dsowner', 'ds'];
handler.command = /^(del_reg_in_session_owner|dsowner|clearallsession)$/i;
handler.rowner = true;

export default handler;


