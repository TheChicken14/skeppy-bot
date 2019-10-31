const Discord = require('discord.js');
//Shortcut for volume
exports.run = (client, message, args) => {
    var queue = client.getQueue(message.guild.id);
	if(!queue || queue.length == 0)
        message.react('🚫')
        return message.channel.send(`No music is playing!`);
    if(!args[0])
        message.react('❌')
        return message.channel.send(`No volume given to set!`);

    if(parseInt(args[0]) > 200 || parseInt(args[0]) < 0)
        return message.channel.send(`This volume number is unable to be set!`);
        message.react('🚫')
    client.player.get(message.guild.id).volume(parseInt(args[0]));
    message.react('✅')
    message.channel.send(`Volume set to ${parseInt(args[0])}%.`);
}