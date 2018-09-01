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
	} else if(args[0].match(/^\d/)){
		userID = args[0];
	}


	client.fetchUser(userID).then((member) => {

		if(!member) return;

		//console.log(member);

		if(!member.avatarURL){
			var thumbnailVar = "https://www.kitk.us/image/discord.png";
		} else {
			var thumbnailVar = member.avatarURL;
		}

		//console.log(member);

		var lUsername = `${member.username}#${member.discriminator}`;

		if(member.bot){
			lUsername = lUsername + ' <:botTag:230105988211015680>';
		}

		const embed = new Discord.RichEmbed()
				.setAuthor(`User Lookup`, `${message.author.avatarURL}`)
				.setThumbnail(`${thumbnailVar}`)
				.addField("Username", `${lUsername}`)
				.addField("User ID", `${member.id}`)
				message.channel.send({embed});

	});
}

exports.conf = {
    DM: true,
    OwnerOnly: false
}