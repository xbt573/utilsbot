const { splitCommand } = require('../utils');

const usage = '/jsonvalid <json>';
const description = 'Validates JSON';

const jsonvalid = (ctx) => {
    const command = splitCommand(ctx.message.text);

    if (command == '') {
        ctx.replyWithMarkdown(`*Usage:* ${usage}`, { reply_to_message_id: ctx.message.message_id });
        return;
    }

    try {
        JSON.parse(command);
        ctx.replyWithMarkdown('*JSON is valid.*',
            { reply_to_message_id: ctx.message.message_id });
    } catch {
        ctx.replyWithMarkdown('*JSON is not valid.*',
            { reply_to_message_id: ctx.message.message_id });
    }
};

module.exports.command = jsonvalid;
module.exports.usage = usage;
module.exports.description = description;