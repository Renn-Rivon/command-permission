exports.messages = (client, message, args, command, options) => {
    try {
        const messagePerm = message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES', false);
        const clientPerm = message.channel.permissionsFor(message.guild.me).has(command.clientPerm, false);
        const memberPerm = message.channel.permissionsFor(message.member).has(command.memberPerm, false);

        if (!command.onlyOwner && messagePerm && clientPerm && !memberPerm) {
            message.channel.send(`> У вас не достаточно прав для выполнения команды: \`\`\`${command.memberPerm}\`\`\``);
        };
        if (messagePerm && !clientPerm) {
            message.channel.send(`> У меня не достаточно прав для выполнения команды: \`\`\`${command.clientPerm}\`\`\``);
        };

        let botAdminID = false;
        for (const thisBotAdminID of options.botOwner) {
            if (message.author.id === thisBotAdminID) botAdminID = thisBotAdminID;
        };

        if (messagePerm && clientPerm && (message.member.id === botAdminID || (!command.onlyOwner && memberPerm))) {
            command.run(client, message, args);
        };
    } catch (error) {
        console.log(error)
    }
};