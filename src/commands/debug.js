const usage = '/debug';
const description = 'Shows message';

const debug = async (ctx) => {
    await ctx.replyWithMarkdown('```\n' + JSON.stringify(ctx.message, null, 4) + '\n```');
};

module.exports.command = debug;
module.exports.usage = usage;
module.exports.description = description;
