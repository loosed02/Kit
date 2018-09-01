const Discord = require('discord.js');

const fs = require("fs");
let data = JSON.parse(fs.readFileSync("./JSON/data.json", "utf8"));

exports.run = (client, message, args, deletedMessage, talkedRecently, embeddedRecently, weatheredRecently, commandCount, coinsSet, roles, queue, sql, logChannel) => {

    let user = message.mentions.users.first();
let output = "<@";

if(!output.includes("<@")){
output = args[0];
} else {
if(!user){
output = "null"
} else if(!args[0]){
output = "";
} else {
output = " " + user.username;
}
}

var action = "cuddle";
var responseNum;
var hug;

	if(!args[0]){
		const embed = new Discord.RichEmbed()
		.setTimestamp()
		.setTitle("This command requires an argument")
		return message.channel.send({embed});
		}

	//hug url
	var responseVar = Math.floor(Math.random()*data.hugNum); 
	var hugVar = "https://kitk.us/bot/int/hug/" + responseVar + ".gif";
    responseNum = responseVar;
    
    if(!user){

        var noMention = args.join(' ');
        //old
        const embed = new Discord.RichEmbed()
           .setDescription(message.author.username + " gave " + noMention + " a " + action)
           .setImage(hugVar)
           .setFooter("Powered by KitK.us | " + responseNum)
         message.channel.send({embed});
        console.log('\x1b[36m', `async: ` + hugVar);
    } else {
    
        const embed = new Discord.RichEmbed()
           .setDescription(message.author.username + " gave" + output + " a " + action)
           .setImage(hugVar)
           .setFooter("Powered by KitK.us | " + responseNum)
         message.channel.send({embed});
        console.log('\x1b[36m', `async: ` + hugVar);
        }
    }
    
exports.conf = {
    DM: true,
    OwnerOnly: false
}