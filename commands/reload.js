const config = require("./../config.json");
const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if(!message.author.id === config.owner) return;

    if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
    delete require.cache[require.resolve(`./${args[0]}.js`)];

    let embedVar = new Discord.RichEmbed()
           .setTimestamp()
           .setDescription(`The module \`${args[0]}\` has been reloaded`)
           message.channel.send({embed: embedVar});

  };