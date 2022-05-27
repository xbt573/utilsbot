const { splitCommand } = require('../utils');

const usage = '/json <json>';
const description = 'Beautifies JSON';

const json = (ctx) => {
    const command = splitCommand(ctx.message.text);

    if (json == '') {
        ctx.replyWithMarkdown(`*Usage:* ${usage}`, { reply_to_message_id: ctx.message.message_id });
        return;
    }

    try {
        const json = JSON.parse(command);
        ctx.replyWithMarkdown('```\n' + JSON.stringify(json, null, 2) + '\n```',
            { reply_to_message_id: ctx.message.message_id });
    } catch {
        ctx.replyWithMarkdown('*JSON is not valid.*',
            { reply_to_message_id: ctx.message.message_id });
    }
};

module.exports.command = json;
module.exports.usage = usage;
module.exports.description = description;