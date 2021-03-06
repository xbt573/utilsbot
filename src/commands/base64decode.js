const { splitCommand } = require('../utils');

const usage = '/base64decode <text>';
const description = 'Decodes text from base64';

const base64decode = async (ctx) => {
    function decodeUnicode(str) {
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    const command = splitCommand(ctx.message.text);

    if (command === '') {
        await ctx.replyWithMarkdown(`*Usage:* ${usage}`,
            { reply_to_message_id: ctx.message.message_id });
        return;
    }

    try {
        const base64 = decodeUnicode(command);
        await ctx.reply(base64,
            { reply_to_message_id: ctx.message.message_id });
    } catch {
        await ctx.replyWithMarkdown('*Base64 string is incorrect!*',
            { reply_to_message_id: ctx.message.message_id });
    }
};

module.exports.usage = usage;
module.exports.description = description;
module.exports.command = base64decode;
