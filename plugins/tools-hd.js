import FormData from "form-data"
import Jimp from "jimp"

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    await m.react('⚡')

    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || q.mediaType || ""

    if (!mime) {
      return conn.sendMessage(m.chat, {
        text: "✨ Por favor, envía o responde a una imagen usando el comando.",
        contextInfo: adReply
      }, { quoted: m })
    }

    if (!/image\/(jpe?g|png)/.test(mime)) {
      return conn.sendMessage(m.chat, {
        text: `❌ El formato *${mime}* no es compatible. Usa imágenes JPEG o PNG.`,
        contextInfo: adReply
      }, { quoted: m })
    }

    await conn.sendMessage(m.chat, {
      text: "🛠️ Mejorando la calidad de la imagen...",
      contextInfo: adReply
    }, { quoted: m })

    const img = await q.download?.()
    const resultBuffer = await remini(img, "enhance")

    await conn.sendFile(m.chat, resultBuffer, 'hd.jpg', '✅ Imagen mejorada.', m)
    await m.react('🔔')
  } catch (e) {
    console.error('[REMINI ERROR]', e)
    await conn.sendMessage(m.chat, {
      text: "❌ Ocurrió un error al procesar la imagen.",
      contextInfo: adReply
    }, { quoted: m })
    await m.react('✖️')
  }
}

handler.command = ["remini", "hd", "enhance"]
handler.tags = ["tools"]
handler.help = ["remini", "hd", "enhance"]
handler.register = true

export default handler

const adReply = {
  externalAdReply: {
    title: "𝐙𝐳𝐳 𝐁𝐨𝐭",
    body: "𝐙𝐳𝐳 𝐁𝐨𝐭",
    thumbnailUrl: "https://qu.ax/WhnpY.jpg",
    sourceUrl: '',
    mediaType: 1,
    renderLargerThumbnail: false
  }
}

async function remini(imageData, operation = "enhance") {
  const availableOperations = ["enhance", "recolor", "dehaze"]
  if (!availableOperations.includes(operation)) operation = "enhance"

  const baseUrl = `https://inferenceengine.vyro.ai/${operation}.vyro`

  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append("image", Buffer.from(imageData), {
      filename: "image.jpg",
      contentType: "image/jpeg"
    })
    formData.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=utf-8"
    })

    formData.submit({
      host: "inferenceengine.vyro.ai",
      path: `/${operation}`,
      method: "POST",
      protocol: "https:",
      headers: {
        "User-Agent": "okhttp/4.9.3",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip"
      }
    }, (err, res) => {
      if (err) return reject(err)
      const chunks = []
      res.on("data", chunk => chunks.push(chunk))
      res.on("end", () => resolve(Buffer.concat(chunks)))
      res.on("error", reject)
    })
  })
}