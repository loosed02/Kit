const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor(0xF46242)
    .setDescription("**Announcements:**\n\n" +
    "**UD** is disabled until the source of it's disfunction is found\nI have no estimate as to when this will happen, but hopefully it's soon\n\n" + 
    "If you spot any unusual behavior, such as no response, or an extremely slow response, please report it with **k?reportbug** along with a description of what you did and what command was acting strangely")
    message.channel.send({embed});
}

exports.conf = {
    DM: true,
    OwnerOnly: false
}
