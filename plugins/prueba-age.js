let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted || !m.quoted.image) return m.reply('Por favor, responde a una imagen para adivinar la edad.')
  
  let imageUrl = await m.quoted.download() 
  
  let apiUrl = `https://deliriussapi-oficial.vercel.app/ia/age?image=${encodeURIComponent(imageUrl)}&language=es`
  
  try {
    let res = await fetch(apiUrl)
    let json = await res.json()
    
    if (!json || !json.age) {
      return m.reply('No se pudo obtener la información de la imagen.')
    }
    
    m.reply(`La edad estimada de la persona en la imagen es: *${json.age} años*`)
  } catch (err) {
    m.reply('Hubo un error al procesar la imagen. Intenta nuevamente.')
    console.error(err)
  }
}

handler.help = ['edadimg']
handler.tags = ['fun', 'rpg']
handler.command = ['edadimg', 'adivinaedad']
handler.register = true

export default handler
