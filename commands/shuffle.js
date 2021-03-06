exports.run = async(client, message, args) => {
    //ignore dm's
    if (message.channel.type === 'dm')
        return message.channel.send(`You need to be in a server to use this command.`);
    if (!message.member.voice.channel.id)
        return message.channel.send(`You're not in a voice channel!`);
    if (client.player.players.get(message.guild.id) && message.member.voice.channel.id !== client.player.players.get(message.guild.id).channel)
        return message.channel.send(`You're not in the playing voice channel!`);
    var queue = client.getQueue(message.guild.id);
    if (!queue || queue.length == 0)
        return message.channel.send(`No music is playing!`);

    if (!client.musicSettings[message.guild.id])
        client.musicSettings[message.guild.id] = { loop: 0, shuffle: false, lock: false, lockid: 0 };

    var ms = client.musicSettings[message.guild.id];

    if (!ms.shuffle) {
        ms.shuffle = true;
        message.channel.send(`Shuffle turned on.`);
    } else {
        ms.shuffle = false;
        message.channel.send(`Shuffle turned off.`);
    }
}
exports.info = {
    name: `shuffle`,
    aliases: [],
    description: `Turn shuffle on/off`,
    usage: `shuffle`,
    category: `Music`,
    lock: true
}