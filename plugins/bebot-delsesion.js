import fs from 'fs';
import path from 'path';

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {
    if (!((args[0] && args[0] == 'plz') || (await global.conn).user.jid == _conn.user.jid)) {
        return m.reply(`Este comando solo puede ser usado en el bot principal! wa.me/${global.conn.user.jid.split('@')[0]}?text=${usedPrefix}delsesion`);
    }

    let authFolderB = m.sender.split('@')[0];
    let sessionFolderPath = `./Sesion Subbots/${authFolderB}`;

    if (!fs.existsSync(sessionFolderPath)) {
        return m.reply(`No se encontró una sesión activa para este usuario.`);
    }

    const getFolderSize = (dirPath) => {
        let totalSize = 0;
        const files = fs.readdirSync(dirPath);
        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            totalSize += stats.size;
        });
        return totalSize;
    };

    let sessionSize = getFolderSize(sessionFolderPath);
    let sizeInMB = (sessionSize / (1024 * 1024)).toFixed(2);

    try {
        fs.rmSync(sessionFolderPath, { recursive: true, force: true });
        m.reply(`Se eliminó con éxito su sesión de ${sizeInMB}MB. Para volver a conectarte, usa #code.`);
    } catch (error) {
        console.error(error);
        m.reply(`Hubo un error al intentar eliminar la sesión.`);
    }
};

handler.help = ['delsesion'];
handler.tags = ['bebot'];
handler.command = ['delsesion'];

export default handler;