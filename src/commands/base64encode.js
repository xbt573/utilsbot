const { splitCommand } = require('../utils');

const usage = '/base64encode <text>';
const description = 'Encodes text to base64';

const base64encode = async (ctx) => {
    function encodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }
        ));
    }

    const command = splitCommand(ctx.message.text);

    if (command === '') {
        await ctx.replyWithMarkdown(`*Usage:* ${usage}`,
            { reply_to_message_id: ctx.message.message_id });
        return;
    }

    const base64 = encodeUnicode(command);
    await ctx.reply(base64,
        { reply_to_message_id: ctx.message.message_id });
};

module.exports.usage = usage;
module.exports.description = description;
module.exports.command = base64encode;
