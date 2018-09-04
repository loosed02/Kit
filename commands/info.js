const Discord = require("discord.js");
const fs = require('fs');
let data = JSON.parse(fs.readFileSync("./JSON/data.json", "utf8"));

exports.run = (client, message) => {
	const embed = new Discord.RichEmbed()
	.setTitle("")
	.setAuthor(client.user.username, client.user.avatarURL)
	//.setDescription("Icon by Gats")
	//.setThumbnail(client.user.avatarURL)

	.setDescription(
		"**Authors: ** Kaboodle#4206, Steppie#9845" + "\n" + 
		"**Guilds/Users: **" + `${client.guilds.size}/${client.users.size}` + "\n" +
		"**Art:** " + /*"[ジジ@セーラー服になりたい。](https://twitter.com/zizi_niisan/)"*/ "Unknown Artist" + "\n" +
		"**Website:** " + "[Link](https://bot.kitk.us/)"
	)

	.setFooter("v." + data.version)

	message.channel.send({embed})
 }
 
exports.conf = {
    DM: true,
    OwnerOnly: false
}