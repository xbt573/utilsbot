const { splitCommand } = require('../utils');

const usage = '/wikilang <en/ru>';
const description = 'Set language for /wiki articles (only admin)';

const wikilang = async (ctx) => {
    const Wikilang = ctx.models.Wikilang;

    const command = splitCommand(ctx.message.text);

    if (command == '' || command != 'en' && command != 'ru') {
        await ctx.replyWithMarkdown(`*Usage:* ${usage}`,
            { reply_to_message_id: ctx.message.message_id });
        return;
    }

    const chatMember = await ctx.getChatMember(ctx.from.id);

    if (ctx.chat.type != 'private' &&
		chatMember.status != 'creator' &&
		chatMember.status != 'administrator') {

        await ctx.replyWithMarkdown('*Only admins can change language!*',
            { reply_to_message_id: ctx.message.message_id });
        return;
    }

    const record = await Wikilang.findOne({
        where: {
            chatId: ctx.chat.id
        }
    });

    if (record === null) {
        await Wikilang.create({ chatId: ctx.chat.id, lang: command });
    } else {
        await Wikilang.update({ lang: command }, {
            where: {
                chatId: ctx.chat.id
            }
        });
    }

    await ctx.replyWithMarkdown('*Success!*',
        { reply_to_message_id: ctx.message.message_id });
};

module.exports.command = wikilang;
module.exports.usage = usage;
module.exports.description = description;
