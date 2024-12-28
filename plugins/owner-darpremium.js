let handler = async (m, { isOwner, reply }) => {
    if (!isOwner) return reply('Solo el propietario puede usar este comando.');
    let user = global.db.data.users[m.sender];
    user.prem = true;
    user.premiumTime = Date.now() + 7 * 24 * 60 * 60 * 1000; 
    m.reply('El Usuario ahora es premium por 7 días');
};
handler.command = ['darpremium'];
export default handler;
