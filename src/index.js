const { Telegraf } = require('telegraf');
const { Wikilang, User, RepUsage } = require('../models');

const { help } = require('./commands/help');
const { start } = require('./commands/start');

const { upRep } = require('./commands/upRep');
const { downRep } = require('./commands/downRep');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Middleware for providing ORM to commands
bot.use(async (ctx, next) => {
    ctx.models = {
        Wikilang: Wikilang,
        User: User,
        RepUsage: RepUsage
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

bot.hears('++', upRep);
bot.hears('--', downRep);

bot.startWebhook('/messages', null, 8443);
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));