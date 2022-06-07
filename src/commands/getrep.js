const usage = '/getrep';
const description = 'Get user rep';

const getRep = async (ctx) => {
    let target;
    let nickname;
    if (ctx.message.reply_to_message) {
        target = ctx.message.reply_to_message.from.id;
        nickname = ctx.message.reply_to_message.from.username;
    } else {
        target = ctx.from.id;
        nickname = ctx.from.username;
    }
    const User = ctx.models.User;
    const row = await User.findOne({
        where: {
            userId: target,
            chatId: ctx.chat.id,
        }
    });

    await ctx.replyWithMarkdown(`*${nickname}*: ${row?.rep || 0}`,
        { reply_to_message_id: ctx.message.message_id });
};

module.exports.command = getRep;
module.exports.usage = usage;
module.exports.description = description;