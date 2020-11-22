# command-permission

[![Discord server](https://img.shields.io/discord/528690317679919116?color=7289da&logo=discord&logoColor=white)](https://discord.gg/8NGtwN9) ![GitHub package.json version](https://img.shields.io/github/package-json/v/Renn-Rivon/command-permission) ![GitHub package.json version](https://img.shields.io/node/v/command-permission)

[English README](https://github.com/Renn-Rivon/command-permission/blob/main/README.md)

### Установка

```sh
$ npm install command-permission
```
* discord.js >= 12.0.0

### Описание

```sh
Простой в использовании менеджер команд. 
1.1. Проверка бота на наличие нужных прав для выполнения команды.
1.2. Проверка пользователя на наличие нужных прав для вызова команды.
1.3. Владелец бота может использовать любые команды на любом сервере, при условии соблюдения пункта 1.1.

Встроенные команды: 
2.1. prefix - отобразить префиксы, 
2.2. help - список команд, 
2.3. help [команда] - информация о команде. 
2.4. Встроенные команды отключаются в параметрах: "commandHelp", "commandPrefix"
```

### Пример
index.js
```sh
const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });

const permission = require("command-permission");
permission.command(client, {
    botOwner: ["botOwnerID"], //id автора бота
    commands: "commands", //Путь к папке commands, комманды должны хранится в одной из подпапок этой папки 
    botPrefix: ["!", "*", ">"], //Префиксы бота
    commandDM: false, //true|false - включить|выключить использование комманд в ЛС бота
    commandHelp: true, //true|false - включить|выключить команду help
    commandHelpDM: true, //true|false - включить|выключить отправление help в ЛС
    commandPrefix: true //true|false - включить|выключить команду prefix
    language: ru_RU //настройка языка
});

client.login("Bot Token");
```

commands/info/test.js
```sh
module.exports = {
    name: "test", //название команды
    aliases: [], //алиасы
    category: "info", //категория, в которой находится файл команды
    description: "Показать аватарку (свою/пользователя)", //описание
    usage: "avatar [user]", //пример использования
    clientPerm: ['ATTACH_FILES'], //список прав бота для успешного выполнения команды
    memberPerm: [], //список прав пользователя для успешного выполнения команды
    onlyOwner: false, //true - команду может использовать только владелец бота
    run: async(client, message, args) => {
        
        //ваш код
        
    }
};
```
### Язык

```sh
Русский:     language: ru_RU
English:     language: en_EN
Українська:  language: uk_UK
Белорусский: language: be_BE
Polski:      language: pl_PL

```

### Ссылки

* [Discord server](https://discord.gg/8NGtwN9)
* [NPM](https://www.npmjs.com/package/command-permission)
* [GitHub](https://github.com/Renn-Rivon/command-permission)

Лицензия
----

MIT
