exports.run = async (client, message, args) => {
    if(!client.musicSettings[message.guild.id])
        client.musicSettings[message.guild.id] = {loop:0,shuffle:false};

    var ms = client.musicSettings[message.guild.id];

    if(!ms.shuffle) {
        ms.shuffle = true;
        message.channel.send(`Shuffle turned on.`);
    } else {
        ms.shuffle = false;
        message.channel.send(`Shuffle turned off.`);
    }
}