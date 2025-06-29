import { downloadContentFromMessage } from '@whiskeysockets/baileys';

const handler = async (m, { conn }) => {
  if (!m.quoted) throw '❌ Responde a un sticker con *.img*';
  const mime = m.quoted.mimetype || '';
  if (!/webp/.test(mime)) throw '❌ Eso no es un sticker válido.';

  try {
    const stream = await downloadContentFromMessage(m.quoted, 'sticker');
    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    if (!buffer || !buffer.length) throw '⚠️ No se pudo obtener el sticker.';

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: '✅ Sticker convertido a imagen 🖼️'
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR FINAL EN .IMG]', e);
    throw '❌ No pude convertir ese sticker. Intenta con otro que sea reciente y estático.';
  }
};

handler.command = /^img$/i;
handler.help = ['img'];
handler.tags = ['tools'];
handler.register = true;

export default handler;