const { splitCommand } = require('../utils');

const usage = '/json <json>';
const description = 'Beautifies JSON';

const json = async (ctx) => {
    const command = splitCommand(ctx.message.text);

    if (json == '') {
        await ctx.replyWithMarkdown(`*Usage:* ${usage}`,
            { reply_to_message_id: ctx.message.message_id });
        return;
    }

    try {
        const json = JSON.parse(command);
        await ctx.replyWithMarkdown('```\n' + JSON.stringify(json, null, 2) + '\n```',
            { reply_to_message_id: ctx.message.message_id });
    } catch {
        await ctx.replyWithMarkdown('*JSON is not valid.*',
            { reply_to_message_id: ctx.message.message_id });
    }
};

module.exports.command = json;
module.exports.usage = usage;
module.exports.description = description;
