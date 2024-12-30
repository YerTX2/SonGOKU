import fs from "fs";
import path from "path";

async function handler(m, { usedPrefix }) {
    try {
        const user = m.sender.split("@")[0];
        const userDir = path.join("./serbot/", user);
        const credsPath = path.join(userDir, "creds.json");

       
        if (!fs.existsSync("./serbot")) {
            return await m.reply("✨ El directorio principal no existe. Contacta al administrador.");
        }

       
        if (fs.existsSync(credsPath)) {
            const token = Buffer.from(fs.readFileSync(credsPath, "utf-8")).toString("base64");
            await m.reply("✨ No compartas tu Token con nadie.\n📫 Tu Token es:");
            await m.reply(token);
        } else {
            await m.reply("✨ No tienes un Token activo.");
        }
    } catch (error) {
        console.error("Error en el handler:", error);
        await m.reply("❌ Ocurrió un error al procesar tu solicitud. Inténtalo nuevamente más tarde.");
    }
}

handler.command = ["token"];
handler.help = ["token"];
handler.tags = ["serbot"];
handler.registrado = true;
handler.private = false;

export default handler;
