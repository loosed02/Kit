const Discord = require('discord.js');

exports.run = (client, message, args) => {
    
	const hex = /^#?[0-9A-F]{6}$/i;;
	let user = message.mentions.users.first();

	var randomColorRegEx = /"^#(?:[0-9a-fA-F]{3}){1,2}$"/g;
	//console.log(randomColor);

	if (message.mentions.members.first()) {
		var randomColor = message.mentions.members.first().displayHexColor;
		var userVari = message.mentions.members.first();

		const embed = new Discord.RichEmbed()
		.setColor("0x" + randomColor.replace("#", ""))
		.setImage("https://api.alexflipnote.xyz/colour/image/" + randomColor.replace("#", ""))
		.setFooter(randomColor)
		message.channel.send({embed});

	  } else if(!args[0]){
		message.channel.send("Please provide a valid hex color code");
	  } else if(hex.test(args[0])){
		const embed = new Discord.RichEmbed()
		.setColor("0x" + args[0].replace("#", ""))
		.setImage("https://api.alexflipnote.xyz/colour/image/" + args[0].replace("#", ""))
		.setFooter(args[0])
		message.channel.send({embed});
	  } else {
		message.channel.send("Please provide a valid hex color code");
	  }

}