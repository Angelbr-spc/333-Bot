import { downloadMediaMessage } from '@whiskeysockets/baileys';

const handler = async (m, { conn }) => {
  if (!m.quoted) throw '❌ Responde a un sticker con *.img*';
  if (!m.quoted.mimetype || !/webp/.test(m.quoted.mimetype)) throw '❌ Solo puedes usar esto con un sticker (webp)';

  try {
    const buffer = await downloadMediaMessage(
      m.quoted,
      'buffer',
      {},
      { reuploadRequest: conn.fetchMsg }
    );

    if (!buffer) throw '⚠️ No se pudo descargar el sticker.';

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: '✅ Aquí tienes la imagen del sticker 🖼️'
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    throw '❌ Ocurrió un error al convertir el sticker.';
  }
};

handler.command = /^img$/i;
handler.help = ['img'];
handler.tags = ['tools'];
handler.register = true;

export default handler;