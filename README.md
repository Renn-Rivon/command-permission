# command-permission

[![Discord server](https://img.shields.io/discord/528690317679919116?color=7289da&logo=discord&logoColor=white)](https://discord.gg/8NGtwN9) ![GitHub package.json version](https://img.shields.io/github/package-json/v/Renn-Rivon/command-permission) ![GitHub package.json version](https://img.shields.io/node/v/command-permission)

[Русский README](https://github.com/Renn-Rivon/command-permission/blob/main/README_RU.md)

### Installation

```sh
$ npm install command-permission
```
* discord.js >= 12.0.0

### Description

```sh
Easy to use command manager.
1.1. Checking the bot for the necessary rights to execute the command.
1.2. Checking the user for the necessary rights to call the command.
1.3. The bot owner can use any commands on any server, subject to paragraph 1.1.

Built-in commands: 
2.1. prefix - display prefixes,
2.2. help - list of commands
2.3. help [command] - information about the command.
2.4. Built-in commands are disabled in parameters: "commandHelp", "commandPrefix"
```

### Example
index.js
```sh
const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });

const permission = require("command-permission");
permission.command(client, {
    botOwner: ["botOwnerID"], //bot author id
    commands: "commands", //path to the commands folder, commands must be stored in one of the subfolders of this folder
    botPrefix: ["!", "*", ">"], //bot prefix
    commandHelp: true, //true|false - on|off command help
    commandPrefix: true //true|false - on|off command prefix
    language: en_EN // language setting
});

client.login("Bot Token");
```

commands/info/test.js
```sh
module.exports = {
    name: "test", //command name
    aliases: [], //aliases
    category: "info", //the category in which the command file is located
    description: "Показать аватарку (свою/пользователя)", //description
    usage: "avatar [user]", //example of use
    clientPerm: ['ATTACH_FILES'], //list of bot rights for successful command execution
    memberPerm: [], //list of user rights for successful command execution
    onlyOwner: false, //true - the command can only be used by the owner of the bot
    run: async(client, message, args) => {
        
        //your code
        
    }
};
```
### Language

```sh
Русский: language: ru_RU
English: language: en_EN
```

### Links

* [Discord server](https://discord.gg/8NGtwN9)
* [NPM](https://www.npmjs.com/package/command-permission)
* [GitHub](https://github.com/Renn-Rivon/command-permission)

License
----

MIT
