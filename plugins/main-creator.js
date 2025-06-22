// Código creado por Deylin
// https://github.com/Deylin-eliac 
// codigo creado para https://github.com/Deylin-eliac/Pikachu-bot 
// No quites créditos

import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
  m.react('🗣️');

const imageUrl = 'https://qu.ax/FxpUy.jpg'
  const numCreador = '573206095607';
  const ownerJid = numCreador + '@s.whatsapp.net';
  const name = await conn.getName(ownerJid) || 'Alee';
  const about = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || `𝐒𝐨𝐲 𝐀𝐥𝐞𝐞, 𝐃𝐮𝐞𝐧̃𝐨 𝐝𝐞𝐥 𝐁𝐨𝐭 𝐀𝐥𝐞𝐞 👑.`;
  const empresa = '𝐀𝐥𝐞𝐞 - 𝐒𝐞𝐫𝐯𝐢𝐜𝐢𝐨𝐬 𝐭𝐞𝐜𝐧𝐨𝐥𝐨𝐠𝐢𝐜𝐨𝐬';

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa};
TITLE:CEO & Fundador
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:correo@empresa.com
URL:https://www.tuempresa.com
NOTE:${about}
ADR:;;Dirección de tu empresa;;;;
X-ABADR:ES
X-ABLabel:Dirección Web
X-ABLabel:Correo Electrónico
X-ABLabel:Teléfono de contacto
X-WA-BIZ-NAME:${name}
X-WA-BIZ-DESCRIPTION:${about}
END:VCARD`.trim();


  await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: name,
        contacts: [{ vcard }]
      },
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: 'Alee'.id,
          newsletterName: 'Alee'.name,
          serverMessageId: -1,
        },
        externalAdReply: {
          title: textbot,
          body: dev,
          thumbnailUrl: 'https://qu.ax/FxpUy.jpg',
          sourceUrl: 'oo',
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true,
        },
      }
    },
    { quoted: m }
  );
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;