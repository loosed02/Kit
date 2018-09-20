const Discord = require("discord.js");
const fs = require('fs');
let data = JSON.parse(fs.readFileSync("./JSON/data.json", "utf8"));

exports.run = (client, message) => {

	var owner = client.fetchUser('378769654942007299');

	const embed = new Discord.RichEmbed()
	.setTitle("")
	.setAuthor(client.user.username, client.user.avatarURL)
	//.setDescription("Icon by Gats")
	//.setThumbnail(client.user.avatarURL)

	.setDescription(
		"**Authors: **taxikab#6969, Steppie#9845" + "\n" + 
		"**Guilds/Users: **" + `${client.guilds.size}/${client.users.size}` + "\n" +
		"**Art:** " + "[Gats](https://www.tumblr.com/safe-mode?url=http%3A%2F%2Fgats.tumblr.com%2F)" + "\n" +
		"**Website:** " + "[Link](https://bot.kitk.us/)"
	)

	.setFooter("v." + data.version)

	message.channel.send({embed})
 }
 
exports.conf = {
    DM: true,
    OwnerOnly: false
}
