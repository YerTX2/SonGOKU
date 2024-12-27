import {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import qrcode from "qrcode";
import NodeCache from "node-cache";
import fs from "fs";
import path from "path";
import pino from "pino";
import { child, spawn, exec } from "child_process";
import { makeWASocket } from "../lib/simple.js";

if (!(global.conns instanceof Array)) {
  global.conns = [];
}

let handler = async (message, { conn, args, usedPrefix, command, isOwner }) => {
  // Verificar si el comando está habilitado
  if (!global.db.data.settings[conn.user.jid]?.jadibotmd) {
    return conn.reply(message.chat, "🚩 Este comando está deshabilitado por mi creador.", message);
  }

  const isCodeMode = args.some((arg) => /(--code|code)/.test(arg?.trim()));
  const targetJid = message.mentionedJid?.[0] || (message.fromMe ? conn.user.jid : message.sender);
  const targetId = targetJid.split("@")[0];
  const basePath = `./${jadi}/${targetId}`;

  // Crear carpeta del usuario si no existe
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  // Guardar credenciales si se envían
  if (args[0]) {
    const creds = JSON.parse(Buffer.from(args[0], "base64").toString("utf-8"));
    fs.writeFileSync(`${basePath}/creds.json`, JSON.stringify(creds, null, "\t"));
  }

  // Verificar si las credenciales son válidas
  if (fs.existsSync(`${basePath}/creds.json`)) {
    const storedCreds = JSON.parse(fs.readFileSync(`${basePath}/creds.json`));
    if (!storedCreds?.registered) {
      fs.unlinkSync(`${basePath}/creds.json`);
    }
  }

  // Configuración del socket de Baileys
  const { state, saveState } = await useMultiFileAuthState(basePath);
  const loggerInstance = pino({ level: "silent" });
  const version = await fetchLatestBaileysVersion();

  const socketConfig = {
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, loggerInstance),
    },
    logger: loggerInstance,
    printQRInTerminal: false,
    version: version.version,
    syncFullHistory: true,
    browser: ["Sub Bot", "Chrome", "110.0.5585.95"],
  };

  const socket = makeWASocket(socketConfig);

  // Manejar eventos de conexión
  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (connection === "open") {
      global.conns.push(socket);
      conn.reply(message.chat, "✅ ¡Conexión establecida!", message);
    } else if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;

      switch (reason) {
        case DisconnectReason.loggedOut:
          conn.reply(message.chat, "❌ Dispositivo desconectado. Por favor, vuelva a conectarse.", message);
          break;

        case DisconnectReason.restartRequired:
          handler(message, { conn, args, usedPrefix, command, isOwner });
          break;

        default:
          console.log(`Conexión cerrada: ${reason || "desconocida"}`);
      }
    }

    if (qr) {
      const qrImage = await qrcode.toBuffer(qr, { scale: 8 });
      conn.sendMessage(message.chat, { image: qrImage, caption: "Escanee este QR para conectar su Sub Bot." }, { quoted: message });
    }
  });

  // Guardar credenciales al cerrar sesión
  socket.ev.on("creds.update", saveState);
};

handler.help = ['serbot', "serbot --code"];
handler.tags = ['jadibot'];
handler.command = ['jadibot', "serbot"];
// Exportar el handler
export default handler;
