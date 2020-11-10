const { readdirSync } = require("fs");

module.exports = (client, options) => {
    try {
        readdirSync(`./${options.commands}/`).forEach(dir => {
            const commands = readdirSync(`./${options.commands}/${dir}/`).filter(file => file.endsWith(".js"));

            for (let file of commands) {
                let pull = require(`../../../${options.commands}/${dir}/${file}`);

                if (pull.name) {
                    client.commands.set(pull.name, pull);
                    console.log('✅', file);
                } else {
                    console.log('❎', file);
                    continue;
                }

                if (pull.aliases && Array.isArray(pull.aliases)) {
                    pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
                };
            };
        });
    } catch (error) {
        console.log(`ERROR: папка "${options.commands}" не найдена!`)
    }
}