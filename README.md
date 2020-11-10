# command-permission

[![Discord server](https://img.shields.io/discord/528690317679919116?color=7289da&logo=discord&logoColor=white)](https://discord.gg/8NGtwN9)

### Установка

```sh
$ npm install command-permission
```
Минимальная необходимая версия Node.js - 12.0.0
Минимальная необходимая версия discord.js - 12.0.0

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
permission(client, {
    botOwner: ["botOwnerID"], //id владельца бота
    commands: "commands", //название папки с сомандами
    botPrefix: ["!", "*", ">"], //масив префиксов
    commandHelp: true, //true|false - включить|выключить встроенную команду help
    commandPrefix: true //true|false - включить|выключить встроенную команду prefix
});

client.login("Bot Token");
```

commands/info/test.js
```sh
module.exports = {
    name: "test", //название команды
    aliases: [], //алиасы
    category: "info", //категория в которой находится файл команды
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
Лицензия
----

MIT
