const Discord = require('discord.js');

exports.run = (client, message, args) => {
if(args[0]){
    var emojiID = args[0].replace(/\D/g,'');
}

if(!emojiID){
    return message.channel.send("Invalid emote");
}

if(!args[0]){
    return message.channel.send("Invalid emote");
} else if(args[0].length < 1){
    return message.channel.send("Invalid emote");
} else if(15 < emojiID.length < 20){
    const embed = new Discord.RichEmbed()
    .setImage('https://cdn.discordapp.com/emojis/' + emojiID + '.png?v=1')
    .setDescription('[Link](https://cdn.discordapp.com/emojis/' + emojiID + '.png?v=1)')
    return message.channel.send(embed);
} else {
    return message.channel.send("Invalid emote ("+ emojiID.length +")");
}
}