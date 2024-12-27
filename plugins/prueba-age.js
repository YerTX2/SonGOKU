let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted || !m.quoted.image) return m.reply('Por favor, responde a una imagen para adivinar la edad.')

  // Descargamos la imagen respondida
  let imageUrl = await m.quoted.download()
  
  // URL de la API con la imagen proporcionada
  let apiUrl = `https://deliriussapi-oficial.vercel.app/ia/age?image=${encodeURIComponent(imageUrl)}&language=es`

  try {
    let res = await fetch(apiUrl)
    let json = await res.json()

    // Verificamos que la respuesta tenga los datos de la edad
    if (json.status === true && json.data && json.data.age) {
      let { age, gender, expression, face_shape } = json.data

      // Mensaje de respuesta con la información obtenida
      m.reply(`
        La edad estimada de la persona en la imagen es: *${age} años*
        Género: *${gender}*
        Expresión facial: *${expression}*
        Forma de la cara: *${face_shape}*
      `)
    } else {
      m.reply('No se pudo obtener la edad de la persona en la imagen.')
    }
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