const { splitCommand } = require('../utils');

const usage = '/jsonvalid <json>';
const description = 'Validates JSON';

const jsonvalid = async (ctx) => {
    const command = splitCommand(ctx.message.text);

    if (command == '') {
        await ctx.replyWithMarkdown(`*Usage:* ${usage}`,
            { reply_to_message_id: ctx.message.message_id });
        return;
    }

    try {
        JSON.parse(command);
        await ctx.replyWithMarkdown('*JSON is valid.*',
            { reply_to_message_id: ctx.message.message_id });
    } catch {
        await ctx.replyWithMarkdown('*JSON is not valid.*',
            { reply_to_message_id: ctx.message.message_id });
    }
};

module.exports.command = jsonvalid;
module.exports.usage = usage;
module.exports.description = description;
