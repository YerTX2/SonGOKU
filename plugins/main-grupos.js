import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {
let img = await (await fetch(`https://telegra.ph/file/0dbf7b27644e8dfa8baa4.jpg`)).buffer()
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
let txt = `*Hola!, te invito a formar parte de la comunidad de 
> SON GOKU / TEAM

>  Enlace Grupo 🌀SonGoku🌀

*👑* ${group}

*◆━━━━━━━▣✦▣━━━━━━━━◆ *

> ⚠️ Enlace anulado? entre aquí! 

Canal :
*🪐* ${canal}
*◆━━━━━━━▣✦▣━━━━━━━━◆ *
> TEAM MoonLight Team

> CANAL 
https://whatsapp.com/channel/0029Vablj8M05MUnustq3q1S 

> GRUPO https://chat.whatsapp.com/GpbF3JCTEr2CSj3zLJ1IQj 

 ⚡ NEXUS HOSTING ⚡

<a href="https://dash.nexus-host.shop"><img src="https://telegra.ph/file/d3842590c88393563191d.jpg" height="125px"></a>

- **💻Dash:** [`Aquí`](https://dash.nexus-host.shop/register?ref=P8FQ3w9Y)
- **Panel:** [`Aquí`](https://panel.nexus-host.shop)
- **Canal de WhatsApp:** [`Aquí`](https://whatsapp.com/channel/0029ValPGGT3GJOqnlYiTx2d)
- **Grupo de WhatsApp:** [`Aquí`](https://chat.whatsapp.com/IeozwFJkPb201lHdjJ8k6f) 
- **SOPORTÉ NEXUS:** [`Aquí`](https://chat.whatsapp.com/DlErIXnbKfx4AvvyngFuSX)

### ☁️ CORINPLUS HOTS 
<a href="https://dash.corinplus.com"><img src="https://qu.ax/ZycD.png" height="125px"></a>
### Información sobre CorinPlus

- **Dashboard:** [`Aquí`](https://dash.corinplus.com)
- **Panel:** [`Aquí`](https://ctrl.corinplus.com)
- **Estado de servicios:** [`Aquí`](https://status.corinplus.com)
- **Canal de WhatsApp:** [`Aquí`](https://whatsapp.com/channel/0029VakUvreFHWpyWUr4Jr0g)
- **Grupo - Soporte:** [`Aquí`](https://chat.whatsapp.com/K235lkvaGvlGRQKYm26xZP)
- **Contacto:** [`Support-CorinPlus Host`](https://wa.me/message/B3KTM5XN2JMRD1)
- **Contacto:** [`elrebelde21`](https://facebook.com/elrebelde21)

> 🚩 ${textbot}`
await conn.sendFile(m.chat, img, "Thumbnail.jpg", txt, m, null, rcanal)
}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = /^(grupos)$/i
export default handler
