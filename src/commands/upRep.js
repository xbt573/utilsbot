const usage = '+ [reply]';
const description = 'Ups reputation for user (admin only)';

const upRep = async (ctx) => {
    if (!ctx.message.reply_to_message) { return; }
    if (ctx.chat.type == 'private' || ctx.chat.type == 'channel') { return; }
    if (ctx.message.reply_to_message.from.id == ctx.from.id) { return; }

    const chatMember = await ctx.getChatMember(ctx.from.id);

    if (chatMember.status != 'creator' &&
        chatMember.status != 'administrator') {

        ctx.replyWithMarkdown('*Only admins can change rep!*',
            { reply_to_message_id: ctx.message.message_id });
        return;
    }

    const User = ctx.models.User;

    let row = await User.findOne({
        where: {
            id: ctx.message.reply_to_message.from.id
        }
    });

    if (row == null) {
        row = await User.create({ id: ctx.message.reply_to_message.from.id, rep: 1 });
    } else {
        row = await User.update({ rep: row.rep+1 }, {
            where: {
                id: ctx.message.reply_to_message.from.id
            }
        });
    }

    row = await User.findOne({
        where: {
            id: ctx.message.reply_to_message.from.id
        }
    });

    ctx.replyWithMarkdown(`*Success!*\nCurrent user rep: ${row.rep}`,
        { reply_to_message_id: ctx.message.message_id });
};

module.exports.upRep = upRep;
module.exports.usage = usage;
module.exports.description = description;