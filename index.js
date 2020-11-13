const { MessageEmbed, Collection } = require("discord.js");
const fs = require("fs");
const { messages } = require("./lib/messages");
let languages;

exports.command = function(client, options) {
    try {
        let botPrefix = options.botPrefix || ["!!"];
        let commands = options.commands || "commands";
        let botOwner = options.botOwner || [];
        let commandHelp = options.commandHelp || true;
        let commandPrefix = options.commandPrefix || true;
        let language = options.language || "ru_RU";

        if (!require(`./language/${language}`)) {
            language = "ru_RU";
        };

        options = {
            botOwner: botOwner,
            commands: commands,
            botPrefix: botPrefix,
            help: commandHelp,
            prefix: commandPrefix,
            language: language
        };

        languages = require(`./language/${options.language}`);
        client.commands = new Collection();
        client.aliases = new Collection();
        client.categories = fs.readdirSync("./commands/");
        ["command"].forEach(handler => { require(`./lib/${handler}`)(client, options) });

        client.on("message", async message => {
            let prefix = false;
            for (const thisPrefix of botPrefix) {
                if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
            };

            if (message.channel.type === "dm" || message.author.bot || message.author === client.user) return;
            if (!message.content.startsWith(prefix)) return;
            if (!message.member) message.member = await message.guild.fetchMember(message);

            content = message.content.toLowerCase();
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();

            if (cmd.length === 0) return;

            if (cmd == "help" && commandHelp == true) {
                try {
                    if (args[0]) {
                        return getCMD(client, message, args[0]);
                    } else {
                        return getAll(client, message);
                    };
                } catch (error) {
                    console.log(error);
                };
            };

            if (cmd == "prefix" && commandPrefix == true) {
                try {
                    message.channel.send(`${languages.indexCommandPrefix}: **${options.botPrefix.join("**, **")}**`);
                } catch (error) {
                    console.log(error);
                };
            };

            let command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command) messages(client, message, args, command, options);
        });

        return client;
    } catch (error) {
        console.log(error);
    };
};

exports.cleanError = (error) => {
    try {
        if (typeof(error) === "string")
            return error.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return error;
    } catch (e) { console.log(e) }
}

function getAll(client, message) {
    try {
        const embed = new MessageEmbed();
        embed.setColor("RANDOM");
        embed.setTitle(`Menu help: **${message.guild.name}**`);
        embed.setFooter(languages.indexGetAllFooter);

        const commands = (category) => {
            return client.commands
                .filter(cmd => cmd.category === category)
                .map(cmd => `\`${cmd.name}\``)
                .join(", ");
        };

        const info = client.categories
            .map(cat => `**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
            .reduce((string, category) => string + "\n" + category);

        embed.setDescription(info);
        message.reply(languages.indexGetAllReply);
        message.author.send({ embed });
        delete embed;
    } catch (error) {
        console.log(error);
    };
};

function getCMD(client, message, input) {
    try {
        const embed = new MessageEmbed();
        const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
        let info = languages.indexGetCMDInfo.replace(/{{input.toLowerCase()}}/g, input.toLowerCase());

        if (!cmd) {
            embed.setColor("RED");
            embed.setDescription(info);
            message.channel.send({ embed });
            return delete embed;
        };

        if (cmd.name) info = `${languages.indexGetCMDName}: ${cmd.name}`;
        if (cmd.aliases) info += `\n${languages.indexGetCMDAliases}: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n${languages.indexGetCMDDescription}: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n${languages.indexGetCMDUsage}: ${cmd.usage}`;
        embed.setFooter(languages.indexGetCMDFooter);
    };

    embed.setColor("GREEN");
    embed.setDescription(info);
    message.channel.send({embed});
    delete embed;
    } catch (error) {
        console.log(error);
    };
};