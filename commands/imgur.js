
const Discord = require("discord.js");
const imgur = require('imgur');
imgur.setClientId('c6c1852dbbe9603');
imgur.setAPIUrl('https://api.imgur.com/3/');

exports.run = (client, message, args) => {

    var Attachment = (message.attachments).array();

	if(!Attachment[0]){
		if(!args[0]) return message.channel.send("No link or image was given");
		var imgUrl = args[0];
	} else {
		var imgUrl = Attachment[0].url;
	}
	message.channel.startTyping();
	imgur.uploadUrl(imgUrl)
    .then(function (json) {
		if(!json.data.link) return message.channel.send("There was an error");
		message.channel.send("<" + json.data.link + ">");
	}).catch((err) => {
	
		const embed = new Discord.RichEmbed()
		.setColor(0xF46242)
		.setTitle("An Error Occured")
		.setFooter(err);
		message.channel.send({embed});
	})
    message.channel.stopTyping();
}

exports.conf = {
    DM: true,
    OwnerOnly: false
}