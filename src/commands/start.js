const usage = '/start';
const description = 'Starts bot';

const start = (ctx) => {
    ctx.replyWithMarkdown('*Hi!* This bot contains utilities for development. To see all commands send /help to me.',
        { reply_to_message_id: ctx.message.message_id });
};

module.exports.start = start;
module.exports.usage = usage;
module.exports.description = description;