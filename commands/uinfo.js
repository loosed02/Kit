const Discord = require('discord.js');

exports.run = (client, message, args, deletedMessage, talkedRecently, embeddedRecently, weatheredRecently, commandCount, coinsSet, roles, queue, sql, logChannel) => {

    async function search(){

    if(!args[0]){
        var searchUser = await message.guild.members.find('id', message.author.id);
    } else {

        var argVar = args[0].replace("<@", "").replace(">", "").replace("!", "");

            var searchbyID = await message.guild.members.find('id', argVar);
            var searchbyUName = await message.guild.members.find('username', args[0]);
            var searchbyDName = await message.guild.members.find('displayName', args[0]);
            var searchbyTag = await message.guild.members.find('tag', args[0]);
        

            if(searchbyID){
                var searchUser = searchbyID;
            }
            if(searchbyUName){
                var searchUser = searchbyUName;
            }
            if(searchbyDName){
                var searchUser = searchbyDName;
            }
            if(searchbyTag){
                var searchUser = searchbyTag;
            }
    }

    if(!searchUser){
        const embed = new Discord.RichEmbed()
						.setColor(0xF46242)
						.setTimestamp() 
						.setTitle("User not found")
						return message.channel.send({embed});
    } else {

        console.log(searchUser);
        var Uguild = searchUser.lastMessage.guild;
        var Umessage = searchUser.lastMessage;

	function dhm(t){
		var cd = 24 * 60 * 60 * 1000,
			ch = 60 * 60 * 1000,
			d = Math.floor(t / cd),
			h = Math.floor( (t - d * cd) / ch),
			m = Math.round( (t - d * cd - h * ch) / 60000),
			pad = function(n){ return n < 10 ? '0' + n : n; };
	  if( m === 60 ){
		h++;
		m = 0;
	  }
	  if( h === 24 ){
		d++;
		h = 0;
	  }
	  return [d, pad(h), pad(m)].join(':');
	}

	var age = dhm((message.createdTimestamp) - (searchUser.joinedTimestamp));
	var roleVar =  searchUser.lastMessage.member.roles.map(a => a.id);
	roleVar = roleVar.slice(1);

	if(!searchUser.displayHexColor){
		var color = "#ffffff";
	} else {
		var color = searchUser.displayHexColor;
	}


	const embed = new Discord.RichEmbed()
					.setColor(color)
					.setThumbnail(searchUser.lastMessage.author.avatarURL)
					.setDescription(`User Info\n\n` 
					+ "**User ID:** " + searchUser.id
					+ "\n**Time since join:** " + age
					+ "\n \n**Roles:**\n" + " <@&" + roleVar.join(">\n <@&") + ">")
					message.channel.send({embed});
        }
    }
    search().catch((err) => {
        const embed = new Discord.RichEmbed()
						.setColor(0xF46242)
						.setTimestamp() 
                        .setTitle("User not found")
                        .setFooter(err)
						return message.channel.send({embed});
    });

}

exports.conf = {
	DM: true,
	OwnerOnly: false
}