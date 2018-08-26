const Discord = require("discord.js");

exports.run = (client, message, args) => {

    async function kick() {
    if(!message.member.permissions.has('KICK_MEMBERS')) {
        const embed = new Discord.RichEmbed()
        .setColor(0xF46242)
        .setTimestamp()
        .setTitle("Sorry, you don't have permission to use this.")
        message.channel.send({embed});
        return;
    }
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member){
        const embed = new Discord.RichEmbed()
        .setColor(0xF46242)
        .setTimestamp()
        .setTitle("Please mention a valid member of this server")
        message.channel.send({embed});
        return;
    }

    if(!member.kickable){
        const embed = new Discord.RichEmbed()
        .setColor(0xF46242)
        .setTimestamp()
        .setTitle("This user is not kickable")
        message.channel.send({embed});
        return;
    }
    let reason = args.slice(1).join(' ');

    if(!reason) reason = "No reason was given";

    async function kickF(i){
        let user = client.fetchUser(message.mentions.members.first().id)
        .then(user => {
            async function kk(){
                 await user.send(`You were kicked from ${message.guild.name} for: ` + reason).catch((err) => {
                     //return message.channel.send("**(" + i + ")Post message was unable to be sent - **" + err);
                 });
                }

                kk();
        }).catch((err)=>{
            const embed = new Discord.RichEmbed()
        .setColor(0xF46242)
        .setTimestamp() //Write to JSON
        .setTitle("Error, please report this to the devs")
        .setFooter(err)
        message.channel.send({embed});
        })
    }

    async function kk(){
        /*
        let user = client.fetchUser(message.mentions.members.first().id)
        await user.send(`You were kicked from ${message.guild.name} for: ` + reason).catch((err) => {
            //return message.channel.send("**(" + i + ")Post message was unable to be sent - **" + err);
        });
        */
       }

    await kk().then(
        await member.kick(reason)
      .catch(error => {
        const embed = new Discord.RichEmbed()
        .setColor(0xF46242)
        .setTimestamp()
        .setTitle("An error occured")
        .setFooter(error)
        message.channel.send({embed});
        return;
      })).catch(error => {
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
      .addField("Member Kicked", `${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`)
      message.channel.send({embed});
      return;
    }

    kick();
}