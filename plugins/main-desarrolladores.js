const handler = async (m, { conn }) => {
  let gifUrl = "https://qu.ax/JgmPo.mp4";

  let text = `
 ╭────────⚔──────╮  
        DESARROLLADORES  
╰────────⚔──────╯  

🔹 **SOBRE EL BOT:**  
Son Goku Bot es una herramienta creada con el objetivo de mejorar la interacción y experiencia de los usuarios en diversas plataformas, ofreciendo funcionalidades avanzadas y soporte constante.

🔹 **CONTACTO DE LOS DESARROLLADORES:**  
╭─────────────────────────╮  
│🏆 **Son Goku Bot - Equipo Oficial**  
│  
│📌 **Tesis**: [+52 243 126 8546]  
│📌 **Matías-Crypto**: [+54 9 221 502-2907]  
│📌 **YerTX2**: [+51 907 376 960]  
╰─────────────────────────╯  

🔹 **AGRADECIMIENTOS:**  
Un agradecimiento especial a todos los colaboradores y usuarios que hacen posible la constante evolución de Son Goku Bot.  

🔹 **¿DUDAS O SUGERENCIAS?**  
No dudes en contactar a cualquiera de los desarrolladores para resolver dudas, enviar sugerencias o reportar problemas.  

`.trim();


  await conn.sendMessage(
    m.chat,
    {
      video: { url: gifUrl },
      gifPlayback: true, 
      caption: text,
      mentions: [m.sender], 
    },
    { quoted: m }
  );
};

handler.command = /^(desarrolladores)$/i; 
export default handler;