// help pls
const usage = '/help';
const description = 'Show all commands';

const help = async (ctx) => {
    const commands = require('../enabledCommands');

    let helpString = '*/help* - _Show all commands_\n*/start* - _Starts bot_\n';

    let usage;
    let description;
    commands.forEach((file) => {
        usage = require(`./${file}`).usage;
        description = require(`./${file}`).description;

        helpString += `*${usage}* - _${description}_\n`;
    });

    await ctx.replyWithMarkdown(helpString,
        { reply_to_message_id: ctx.message.message_id });
};

module.exports.help = help;
module.exports.usage = usage;
module.exports.description = description;
