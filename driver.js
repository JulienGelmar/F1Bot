var config = require('./drivers.json');
const Discord = require('discord.js');
const driver = config[process.argv[2]];
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready!');
    client.user.setPresence({
        game: {
            name: driver.points + ' Points'
        },
        status: 'online'
    });
    client.on("message", message => {
        let pos = (driver.position < 10) ? "0" + driver.position : driver.position;
        if(message.guild !== undefined) {
            message.guild.members.find("id", client.user.id).setNickname(pos + '. ' + driver.long);
        }
    });
});
client.on('error', () => {
    console.log('Discord is having issues, please hang on...');
});

client.login(driver.token);