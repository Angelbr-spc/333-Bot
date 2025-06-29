const { downloadMediaMessage } = require('@whiskeysockets/baileys');

async function handler(m, { conn, text, usedPrefix, command }) {
  if (!m.quoted) throw 'Responde a un sticker con el comando .img';

  const mime = m.quoted.mimetype || '';
  if (!/webp/.test(mime)) throw 'Solo puedes usar esto en stickers (webp).';

  try {
    const imgBuffer = await downloadMediaMessage(m.quoted, 'buffer', {}, { reuploadRequest: conn.fetchMsg });
    if (!imgBuffer) throw 'No se pudo descargar el sticker.';

    await conn.sendMessage(m.chat, { image: imgBuffer, caption: 'Aquí está tu sticker en imagen 🖼️' }, { quoted: m });

  } catch (e) {
    console.error(e);
    throw 'Ocurrió un error al convertir el sticker a imagen.';
  }
}

handler.command = /^img$/i;
handler.help = ['img'];
handler.tags = ['tools'];
handler.premium = false;

export default handler;