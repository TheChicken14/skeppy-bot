exports.run = (client, message, args) => {
  if (message.author.id !== client.config.ownerID)
    return message.reply('no');

  if (args[0] === 'all') {
    message.channel.send(`Reloading all commands...`)
    client.reloadAllCommands()
    message.channel.send(`All commands have been reloaded!`)
    return;
  }

  if (!args || args.length < 1) return message.reply("Must provide a command name to reload.");
  const commandName = args[0];
  // Check if the command exists and is valid
  if (!client.commands.has(commandName)) {
    return message.reply("That command does not exist");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Collection
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.reply(`The command \`${commandName}\` has been reloaded`);
};
exports.info = {
  name: `reload`,
  aliases: [],
  description: `Reload a command`,
  usage: `reload <command>`,
  category: `Owner Only`
}