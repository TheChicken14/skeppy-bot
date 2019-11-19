const Discord = require('discord.js');

exports.run = (client, message, args) => {
	if(!message.member.voiceChannelID)
    	return message.channel.send(`You're not in a voice channel!`);

	if(client.player.get(message.guild.id) && message.member.voiceChannelID !== client.player.get(message.guild.id).channel)
		return message.channel.send(`You're not in the playing voice channel!`);
  	var queue = client.getQueue(message.guild.id);
	if(!queue || queue.length == 0)
		return message.channel.send(`No music is playing!`);
	let howMany = 1;
	if(args[0])
		howMany = Math.min(parseInt(args[0]), queue.length);

	queue.splice(0, howMany - 1);
	if(howMany == 1)
			message.channel.send(`Skipped ${howMany} song.`);
	if(howMany > 1)
		message.channel.send(`Skipped ${howMany} songs.`);
		client.player.get(message.guild.id).stop();
}
