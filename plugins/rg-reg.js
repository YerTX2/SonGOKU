import db from '../lib/database.js';
import { createHash } from 'crypto';
import fetch from 'node-fetch';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {
    let user = global.db.data.users[m.sender];
    let name2 = conn.getName(m.sender);

    // Verifica si el usuario ya está registrado
    if (user.registered) {
        return m.reply(`🌟 *Ya estás registrado.*\n\n¿Deseas volver a registrarte? Usa este comando para eliminar tu registro:\n\n*${usedPrefix}unreg <Número de serie>*`);
    }

    // Validación de entrada
    if (!Reg.test(text)) {
        return m.reply(`❌ *Formato incorrecto.*\n\nUsa el comando de esta forma:\n\n*${usedPrefix + command} nombre.edad*\n\n📌 Ejemplo: *${usedPrefix + command} ${name2}.16*`);
    }

    let [_, name, splitter, age] = text.match(Reg);

    // Verificaciones adicionales
    if (!name) return m.reply('🐉 *El nombre no puede estar vacío.*');
    if (!age) return m.reply('🐉 *La edad no puede estar vacía.*');
    if (name.length > 50) return m.reply('🐉 *El nombre es demasiado largo (máx. 50 caracteres).*');
    
    age = parseInt(age);
    if (isNaN(age) || age <= 0) return m.reply('🐉 *Por favor, ingresa una edad válida.*');
    if (age > 100) return m.reply('👴🏻 *Eres muy sabio, maestro Roshi.*');
    
    // Guardar registro
    user.name = name.trim();
    user.age = age;
    user.regTime = +new Date();
    user.registered = true;

    // Crear número de serie único
    let sn = createHash('md5').update(m.sender).digest('hex');

    // Imagen del registro
    let img = await (await fetch(`https://tinyurl.com/2b2cu7cq`)).buffer();

    // Diseño del mensaje de confirmación
    let txt = `🌟 *Registro Exitoso*\n\n`;
    txt += `📝 *Nombre:* ${name}\n`;
    txt += `🎂 *Edad:* ${age} años\n`;
    txt += `🔑 *Número de serie:*\n${sn}\n\n`;
    txt += `✅ *¡Gracias por registrarte!*\n\nDisfruta de todas las funciones disponibles.`;

    // Enviar confirmación al usuario
    await conn.sendMessage(m.chat, { 
        image: img, 
        caption: txt 
    });

    // Reacción de éxito
    await m.react('✅');
};

// Configuración del comando
handler.help = ['reg'].map(v => v + ' <nombre.edad>');
handler.tags = ['rg'];
handler.command = ['verify', 'reg', 'register', 'registrar'];

export default handler;
