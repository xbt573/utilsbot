const wikijs = require('wikijs').default;
const { splitCommand } = require('../utils');

const usage = '/wiki <article>';
const description = 'Search articles on Wikipedia';

const wiki = async (ctx) => {
    const command = splitCommand(ctx.message.text);

    if (command == '') {
        ctx.replyWithMarkdown(`*Usage*: ${usage}`, { reply_to_message_id: ctx.message.message_id });
        return;
    }

    const Wikilang = ctx.models.Wikilang;
    const req = await Wikilang.findOne({
        where: {
            chatId: ctx.chat.id
        }
    });

    let lang;
    if (req) {
        lang = req.dataValues.lang;
    } else {
        lang = 'en';
    }

    let article;
    try {
        const response = await wikijs({ apiUrl: `https://${lang}.wikipedia.org/w/api.php` }).page(command.toLowerCase());
        const summary = await response.summary();
        article = summary.split('\n')[0] + '\n' + response.fullurl;
    } catch { article = ''; }

    if (article == '') {
        ctx.replyWithMarkdown('*Article not found*.', { reply_to_message_id: ctx.message.message_id });
        return;
    }

    ctx.reply(article, { reply_to_message_id: ctx.message.message_id,
        disable_web_page_preview: true });
};

module.exports.command = wiki;
module.exports.usage = usage;
module.exports.description = description;