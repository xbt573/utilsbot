const { Telegraf } = require('telegraf');
const { Wikilang } = require('../models');

const { help } = require('./commands/help');
const { start } = require('./commands/start');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Middleware for providing ORM to commands
bot.use(async (ctx, next) => {
    ctx.models = {
        Wikilang: Wikilang
    };
    await next();
});

bot.help(help);
bot.start(start);

require('./enabledCommands').forEach((command) => {
    try {
        bot.command(command, require(`./commands/${command}`).command);
    } catch {
        console.log(`Command ${command} does not exist, skipping`);
        return;
    }

    console.log(`Enabled command ${command}`);
});

bot.startWebhook('/messages', null, 8443);
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));