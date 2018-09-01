const rpgdice = require('droll');
const Discord = require('discord.js');

exports.run = (client, message, args) => {
	if(args[0]){

		console.log(args[0]);
	var numbers  = args[0].match(/\d+/g);
	console.log(numbers);

	if(parseInt(numbers[0]) > 120){
		return message.channel.send("One number was too high");
	} else if(numbers[1]){
		if(parseInt(numbers[1]) > 120){
			return message.channel.send("One number was too high");
		}
	} else {

		if(numbers.length === 1){
			
			var result = rpgdice.roll("1d" + args.join(' '));

			if(!result){
				message.channel.send("Incorrect syntax");
			}
	
			if(result.length > 50) return message.channel.send("Too many dice");
			message.channel.send("Result: " + result);

		} else {


			var result = rpgdice.roll(args.join(' '));

		if(!result){
			return message.channel.send("Incorrect syntax");
		}

		if(result.length > 50) return message.channel.send("Too many dice");
		message.channel.send("Result: " + result);
		
	}
      
	}
}
}

exports.conf = {
	DM: true,
	OwnerOnly: false
}