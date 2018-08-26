const Discord = require("discord.js");
const fs = require('fs');
let data = JSON.parse(fs.readFileSync("./JSON/prefixes.json", "utf8"));

exports.run = (client, message, args) => {
   
    const embed = new Discord.RichEmbed()
          .setTimestamp() //Write to JSON
          .setTitle("This server: " + data[message.guild.id].prefix)
        message.channel.send({embed});
       
}