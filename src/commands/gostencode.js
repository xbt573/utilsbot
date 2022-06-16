const { splitCommand } = require('../utils');
const { gostEngine } = require('node-gost-crypto');

const description = 'Encodes text to GOST R 34.11-2012';
const usage = '/gostencode <text>';

const gostencode = async (ctx) => {
    const text = splitCommand(ctx.message.text);

    if (text === '') {
        await ctx.replyWithMarkdown('*Empty text!*',
            { reply_to_message_id: ctx.message.message_id });
        return;
    }

    const buffer = Buffer.from(text);
    const digest = gostEngine.getGostDigest({ name: 'GOST R 34.11',
                                              length: 256,
                                              version: 2012 });
    const encoded = Buffer.from(digest.digest(buffer)).toString('hex');

    await ctx.reply(encoded,
        { reply_to_message_id: ctx.message.message_id });
};

module.exports.description = description;
module.exports.usage = usage;
module.exports.command = gostencode;
