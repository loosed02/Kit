const Discord = require("discord.js");

exports.run = (client, message, args, deletedMessage, talkedRecently, embeddedRecently, weatheredRecently, commandCount, coinsSet, roles, queue, sql, logChannel, settings, tossedSet) => {
   

  sql.get(`SELECT * FROM prefixes WHERE serverId ="${message.guild.id}"`).then(row => {

    if(!row){
      var prefix = "k?";
    } else {
      var prefix = row.prefix;
    }

    const embed = new Discord.RichEmbed()
          .setTimestamp() //Write to JSON
          .setTitle("This server: " + prefix)
        message.channel.send({embed});


  });
    
       
}

exports.conf = {
  DM: true,
  OwnerOnly: false
}