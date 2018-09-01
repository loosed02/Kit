const Discord = require("discord.js");

const fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

exports.run = (client, message, args) => {
	
	if(message.author.id === config.owner){
    async function ping(){
		//Uptime
		let totalSeconds = (client.uptime / 1000);
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;
		let uptimeVar = `${hours} Hours, and ${minutes} Minutes`;

		const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
		arr.reverse();
		const used = process.memoryUsage();

	    const m = await message.channel.send("Ping?");
	const embed = new Discord.RichEmbed()
	.setTitle("")
	.addField("Uptime", uptimeVar)
	.addField("Response Time", `Bot response is **${m.createdTimestamp - message.createdTimestamp}ms.** API response is **${Math.round(client.ping)}ms**`, true)

	m.edit({embed});
	
	var pingVar = `${m.createdTimestamp - message.createdTimestamp}ms`;
    //admin.ping(pingVar, data, fs);
    }

	ping();
}

}

exports.conf = {
	DM: true,
	OwnerOnly: false
}