const Discord = require("discord.js");

exports.run = (client, message, args) => {
    async function ban(){
    if(!message.member.permissions.has('BAN_MEMBERS')) 
			
    return message.reply("Sorry, you don't have permission to use this.");

  let member = message.mentions.members.first();
  if(!member){
      const embed = new Discord.RichEmbed()
      .setColor(0xF46242)
      .setTimestamp()
      .setTitle("Please mention a valid member of this server")
      message.channel.send({embed});
      return;
  }

  if(!member.bannable){
      const embed = new Discord.RichEmbed()
      .setColor(0xF46242)
      .setTimestamp()
      .setTitle("This user is not bannable")
      message.channel.send({embed});
      return;
  }

  let reason = args.slice(1).join(' ');
  if(!reason) reason = "No reason was given";

  await member.ban(reason)
    .catch(error => {
      const embed = new Discord.RichEmbed()
      .setColor(0xF46242)
      .setTimestamp()
      .setTitle("An error occured")
      .setFooter(error)
      message.channel.send({embed});
      return;
    });

    const embed = new Discord.RichEmbed()
    .setColor(0xF46242)
    .setTimestamp()
    .addField("Member Banned", `${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`)
    message.channel.send({embed});
    return;
}
ban();

 }
 
exports.conf = {
    DM: true,
    OwnerOnly: false
}