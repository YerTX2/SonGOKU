let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted || !m.quoted.image) return m.reply('Por favor, responde a una imagen para adivinar la edad.')

  // Descargamos la imagen respondida
  let imageUrl = await m.quoted.download()

  // Subimos la imagen a Qu.ax (cualquier servicio similar que no requiera autenticación)
  const formData = new FormData()
  formData.append('file', imageUrl, 'image.jpg')

  // Subimos la imagen a Qu.ax
  const uploadResponse = await fetch('https://qu.ax/api/upload', {
    method: 'POST',
    body: formData
  })

  const uploadData = await uploadResponse.json()
  const imageLink = uploadData.link  // Obtenemos la URL de la imagen subida

  // Si la subida fue exitosa, la URL estará disponible en uploadData.link
  if (!imageLink) return m.reply('No se pudo subir la imagen.')

  // URL de la API con la imagen proporcionada
  let apiUrl = `https://deliriussapi-oficial.vercel.app/ia/age?image=${encodeURIComponent(imageLink)}&language=es`

  try {
    let res = await fetch(apiUrl)
    let json = await res.json()

    if (json.status === true && json.data && json.data.age) {
      let { age, gender, expression, face_shape } = json.data

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