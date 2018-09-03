const Discord = require("discord.js");


exports.run = (client, message, args) => {
	let userID = message.author.id;

	//Find by mention
	if(args.join(' ').startsWith("<@") || args.join(' ').startsWith("<!@")){
	userID = args[0];
	userID = userID.replace("<@", "");
	userID = userID.replace("<@!", "");
	userID = userID.replace(">", "");
	userID = userID.replace("!", "");
	} else if(!args[0]){
		userID = message.author.id;
	} else if(args[0] === "server"){
		const embed = new Discord.RichEmbed()
		.setDescription("[Link](" + message.guild.iconURL.replace(".jpg", ".png") + ")")
		.setImage(message.guild.iconURL.replace(".jpg", ".png"))
		return message.channel.send({embed});
	} else if(args[0].match(/^\d/)){
		userID = args[0];
	} else {
		try{
		userID = message.guild.members.find("displayName", args.join(' ')).id;
		}
		catch(err){
			const embed = new Discord.RichEmbed()
			.setColor(0xF46242)
			.setTimestamp() //Write to JSON
			.setTitle("Error: Invalid User ID, Username or Mention (Use exact display name)")
			message.channel.send({embed});
			return;
		}
	}
	if(userID === ""){
		const embed = new Discord.RichEmbed()
		.setColor(0xF46242)
		.setTimestamp()
		.setTitle("Error: Invalid User ID, Username or Mention (Use exact display name)")
		message.channel.send({embed});
	} else {


	client.fetchUser(userID).then(myUser => {
		const embed = new Discord.RichEmbed()
		.setDescription("[Link](" + myUser.avatarURL + ")")
		.setImage(myUser.avatarURL)
		message.channel.send({embed});
		//message.channel.send(myUser.avatarURL); // My user's avatar is here!
	}).catch((err)=>{
		const embed = new Discord.RichEmbed()
	.setColor(0xF46242)
	.setTimestamp() //Write to JSON
	.setTitle("Error: Invalid User ID, Username or Mention (Use exact display name)")
	.setFooter(err)
	message.channel.send({embed});
	});
	
	}
}

exports.conf = {
    DM: true,
    OwnerOnly: false
}