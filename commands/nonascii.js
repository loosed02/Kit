//run yadda yada
const accents = require('remove-accents');
var latinize = require('latinize');
var unidecode = require('unidecode');

exports.run = (client, message, args) => {
if(!args[0]) return message.channel.send("No arguments were given");

	if(!message.mentions.users.first()){
	var str = args.join(' ');
	} else {
	var usr = message.mentions.users.first();
	//console.log(usr);
	var str = usr.username;
	}

	if(!str) return message.channel.send("The given string was empty");
	//str.replace(/[^\x00-\x7F]/g, "");
	//str.replace(/^[\u0080-\uffff]/g, "");
	//str = str.replace(/[^A-Za-z]/g, "");
	str = accents.remove(str);
	str = latinize(str);
	str = unidecode(str);
	//str = str.replace(/[^A-Za-z]/g, "");

	message.channel.send("`ASCII:` " + str);

	if(message.mentions.users.first()){
	if(message.member.permissions.has('MANAGE_NICKNAMES')){
		message.mentions.users.first().setNickname(str).catch((err)=>{});
	}
    }
}