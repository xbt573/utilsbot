const splitCommand = (text) => {
    let delimeter;

    if (text.includes('\n')) {
        delimeter = '\n';
    } else {
        delimeter = ' ';
    }

    return text.split(delimeter).slice(1).join(' ');
};

module.exports.splitCommand = splitCommand;