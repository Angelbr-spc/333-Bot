import { downloadMediaMessage } from '@whiskeysockets/baileys';

const handler = async (m, { conn }) => {
  if (!m.quoted) throw '❌ Responde a un sticker con *.img*';
  const mime = m.quoted.mimetype || '';
  if (!/webp/.test(mime)) throw '❌ Eso no es un sticker válido.';

  try {
    const buffer = await downloadMediaMessage(
      m.quoted,
      'buffer',
      {},
      { reuploadRequest: conn.fetchMsg }
    );

    if (!buffer) throw new Error('Buffer vacío al intentar descargar el sticker');

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: '✅ Aquí tienes la imagen del sticker 🖼️'
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR EN .IMG]', e); // 👈 esto saldrá en consola
    throw '❌ Ocurrió un error al convertir el sticker. Asegúrate de responder a un sticker reciente y estático.';
  }
};

handler.command = /^img$/i;
handler.help = ['img'];
handler.tags = ['tools'];
handler.register = true;

export default handler;