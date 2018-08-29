const Discord = require("discord.js");

const fs = require('fs');

exports.run = (client, message, args, deletedMessage, talkedRecently, embeddedRecently, weatheredRecently, commandCount, coinsSet, roles, queue, sql, logChannel, settings) => {

if(message.member.permissions.has('BAN_MEMBERS')){

	if(args[0] === "setchannel"){
		var channelID =  args[1].replace("<#","").replace(">","");
	
		if(isNaN(channelID) || channelID.length > 23 || channelID.length < 15){
	
			const embed = new Discord.RichEmbed()
			.setColor(0xF46242)
			.setDescription("Invalid channel ID")
			return message.channel.send({embed});
	
		} else {
			const embed = new Discord.RichEmbed()
		.setDescription("Welcome channel set to Channel ID: " + channelID)
		message.channel.send({embed});
		sql.run(`UPDATE prefixes SET welcomeChannel = "${channelID}" WHERE serverId = ${message.guild.id}`);
		}

	} else if(args[0] === "edit"){
		const embed = new Discord.RichEmbed()
		.setDescription("Welcome message set to: " + args.slice(1).join(' '))
		message.channel.send({embed});
		sql.run(`UPDATE prefixes SET welcomeMessage = "${args.slice(1).join(' ')}" WHERE serverId = ${message.guild.id}`);
	} else if(args[0] === "toggle"){

		sql.get(`SELECT * FROM prefixes WHERE serverId ="${message.guild.id}"`).then(row => {
			
			if(row.shouldWelcome === "true"){
				const embed = new Discord.RichEmbed()
		.setColor(0xF46242)
		.setDescription("Welcome messages disabled")
		message.channel.send({embed});
		sql.run(`UPDATE prefixes SET shouldWelcome = "false" WHERE serverId = ${message.guild.id}`);
			} else {
				const embed = new Discord.RichEmbed()
		.setColor(0x32ff58)
		.setDescription("Welcome messages enabled")
		message.channel.send({embed});
		sql.run(`UPDATE prefixes SET shouldWelcome = "true" WHERE serverId = ${message.guild.id}`);
			}
				
				}).catch(() => {
				  console.error;
				});

	
	} else {
		//invalid sub-command
		const embed = new Discord.RichEmbed()
      .setColor(0xF46242)
	  .setDescription("Invalid sub-command")
	  .setFooter("Use k?help welcome")
      message.channel.send({embed});
	}

} else {
	const embed = new Discord.RichEmbed()
			.setColor(0xF46242)
			.setDescription("You don't have permission to do this")
			message.channel.send({embed});
}

/*
	if(!settings[message.guild.id]){
            
		settings[message.guild.id] = {
		shouldWelcome: "false",
		welcomeMessage: "Welcome to the server {member}",
		welcomeChannel: "null",
		serverName: message.guild.name,
		serverID: message.guild.id,
		serverOwner: message.guild.owner_id
	  };
	}
  
	  fs.writeFile("./JSON/settings.json", JSON.stringify(settings, null, 2), (err) => {
		if (err) console.error("JSON:"+ err);
	  });

		
		if(message.member.permissions.has('BAN_MEMBERS')){
			if(!args[0]){
		
			if(settings[message.guild.id].shouldWelcome === "true"){
				settings[message.guild.id].shouldWelcome = "false";
				const embed = new Discord.RichEmbed()
				
				.setDescription("Welcome messages disabled")
				message.channel.send({embed});
			} else {
				settings[message.guild.id].shouldWelcome = "true";
				const embed = new Discord.RichEmbed()
				
				.setDescription("Welcome messages enabled\n\nUse kk!welcome edit <message> to change the message\n\n**{member}** will be replaced with a mention\n**{member.username}** will be replaced with a username\n**{guild}** will be replaced with the guild's name\n\nUse kk!welcome setchannel #channel to change the channel (by channel ID or mention, names will not work)")
				message.channel.send({embed});
			}
			fs.writeFile("./JSON/settings.json", JSON.stringify(settings, null, 2), (err) => {
			console.error(err)
		});
	} else if(args[0] === "setchannel"){
	
		var channelID =  args[1].replace("<#","").replace(">","");
	
		if(isNaN(channelID) || channelID.length > 23 || channelID.length < 15){
	
			const embed = new Discord.RichEmbed()
			.setColor(0xF46242)
			.setDescription("Invalid channel ID")
			return message.channel.send({embed});
	
		}
		settings[message.guild.id].welcomeChannel = channelID;
	
				const embed = new Discord.RichEmbed()
				
				.setDescription("Channel updated to channel ID: " + settings[message.guild.id].welcomeChannel)
				message.channel.send({embed});
	
				fs.writeFile("./JSON/settings.json", JSON.stringify(settings, null, 2), (err) => {
					console.error(err)
				});
	} else if(args[0] === "edit"){
		var newMessage = (args.join(' ')).replace(args[0], "");
		var newMessageVar = newMessage;
		newMessage = newMessage.replace("{member}", "@new-member");
		settings[message.guild.id].welcomeMessage = newMessageVar;
		const embed = new Discord.RichEmbed()
		
		.setDescription("Welcome message changed to: " + newMessage)
		message.channel.send({embed});
		//edit message
	
		fs.writeFile("./JSON/settings.json", JSON.stringify(settings, null, 2), (err) => {
			console.error(err)
		});
	}
	
		} else {
			const embed = new Discord.RichEmbed()
			.setColor(0xF46242)
			.setDescription("You don't have permission to do this")
			message.channel.send({embed});
		}
*/

	}

