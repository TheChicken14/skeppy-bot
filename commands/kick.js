exports.run = (client, message, args) => {
    //ignore dm's
    if (message.channel.type === 'dm')
        return message.channel.send(`You need to be in a server to use this command.`);

    if (!message.channel.permissionsFor(message.member).has("KICK_MEMBERS", false))
        return message.reply("Sorry, you don't have permissions to use this!  ");

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
        return message.reply("Please mention a valid member of this server");
    if (!member.kickable)
        return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";

    // Now, time for a swift kick in the nuts!
    member.kick(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: \`\`\`${reason}\`\`\``);
    client.users.resolve(member.user.id).send(`You have been kicked from ${message.guild.name} by ${message.author.tag} for \`\`\`${reason}\`\`\``)
}
exports.info = {
    name: `kick`,
    aliases: [],
    description: `Kick someone from your server!`,
    usage: `kick <mention> [reason]`,
    category: `Admin`
}