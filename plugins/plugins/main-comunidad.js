const handler = async (m, { conn }) => {
  let gifUrl = "https://qu.ax/WhnpY.jpg";

  let text = `
 ──────── ⚔ ────────  
     *COMUNIDAD*  
──────── ⚔ ────────  

*Bot zzz*  
• ,👥➤ **Grupo de WhatsApp de la comunidad de Bot zzz Ai**  
   Únete para compartir y resolver dudas con otros usuarios. 
  ➤https://whatsapp.com/channel/0029Vaua0ZD3gvWjQaIpSy18

• 📢 ➤ *Canal de Bot zzz Ai*  
   Recibe actualizaciones, noticias y lanzamientos del bot.  
https://whatsapp.com/channel/0029Vaua0ZD3gvWjQaIpSy18
• 💬 ➤ *Grupo de WhatsApp activo*  
   Chatea con usuarios en tiempo real y sé parte de la conversación y usa al bot que esta de uso libre.  
➤https://chat.whatsapp.com/E1kx7olE0RpA18BdALdaWV

──────── ⚔ ────────  
🔍 *¿Sabías que...?* 
- El Bot zzz Ai es actualizado regularmente para mejorar su desempeño.  
- Puedes sugerir mejoras o reportar errores directamente en los grupos.  
- Nuestra comunidad sigue creciendo y cuenta con soporte activo.  
-
`.trim();


  await conn.sendMessage(
    m.chat,
    {
      video: { url: gifUrl },
      gifPlayback: true, 
      caption: text,
      mentions: [m.sender], 
    },
    { quoted: m }
  );
};

handler.command = /^(comunidad)$/i; 
export default handler;