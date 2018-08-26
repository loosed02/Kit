const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if(message.author.id === "378769654942007299" || message.author.id === "365881235043516427"){
        const embed = new Discord.RichEmbed()
                .setColor(0xF46242)
                .setTimestamp() //Write to JSON
                .setTitle("Process restarted")
                message.channel.send({embed});
        process.exit(0);
            } else {
                const embed = new Discord.RichEmbed()
                .setColor(0xF46242)
                .setTimestamp() //Write to JSON
                .setTitle("You do not have permission to do this. (Bot Owner required)")
                message.channel.send({embed});
                  }
  };