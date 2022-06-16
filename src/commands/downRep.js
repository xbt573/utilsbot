const usage = '- [reply]';
const description = 'Down reputation for user (admin only)';

const downRep = async (ctx) => {
    if (!ctx.message.reply_to_message) { return; }
    if (ctx.chat.type == 'private' || ctx.chat.type == 'channel') { return; }
    if (ctx.message.reply_to_message.from.id == ctx.from.id) { return; }

    const chatMember = await ctx.getChatMember(ctx.from.id);

    // if (chatMember.status != 'creator' &&
    //     chatMember.status != 'administrator') {

    //     // ctx.replyWithMarkdown('*Only admins can change rep!*',
    //     //     { reply_to_message_id: ctx.message.message_id });
    //     return;
    // }

    const User = ctx.models.User;
    const RepUsage = ctx.models.RepUsage;

    const lastResponse = await RepUsage.findOne({
        where: {
            chatId: ctx.chat.id,
            userId: chatMember.user.id
        }
    });

    if (lastResponse !== null) {
        if (Date.now() - lastResponse.time < 300000) { return; }
    }

    let row = await User.findOne({
        where: {
            userId: ctx.message.reply_to_message.from.id
        }
    });

    if (row == null) {
        row = await User.create({
            userId: ctx.message.reply_to_message.from.id,
            chatId: ctx.chat.id,
            rep: 1
        });
    } else {
        row = await User.update({ rep: row.rep - 1 }, {
            where: {
                userId: ctx.message.reply_to_message.from.id,
                chatId: ctx.chat.id
            }
        });
    }

    row = await User.findOne({
        where: {
            userId: ctx.message.reply_to_message.from.id
        }
    });

    await ctx.replyWithMarkdown(`*Success!*\nCurrent user rep: ${row.rep}`,
        { reply_to_message_id: ctx.message.message_id });

    if (lastResponse) {
        await RepUsage.update({ time: Date.now() }, {
            where: {
                chatId: ctx.chat.id,
                userId: chatMember.user.id
            }
        });
    } else {
        await RepUsage.create({
            chatId: ctx.chat.id,
            userId: chatMember.user.id,
            time: Date.now()
        });
    }
};

module.exports.downRep = downRep;
module.exports.usage = usage;
module.exports.description = description;
