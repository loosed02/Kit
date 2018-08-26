const rpgdice = require('rpg-dice');
const Discord = require('discord.js');

exports.run = (client, message, args) => {
	if(args[0]){
var roll = args[0];

if(args[0].match(/\d+/g).length = 1){


	var numbers  = args[0].match(/\d+/g);

	if(parseInt(numbers[0]) > 300){
		message.channel.send("One number was too high");
	} else {

console.log(numbers);

			var result = rpgdice.roll("1d" + numbers[0]);

		if(!result.result){
			message.channel.send("Incorrect syntax");
		}

		if(result.rolls.length > 50) return message.channel.send("Too many dice");
		message.channel.send("Result: " + result.result +
                        "\n" + "Individual: " + result.rolls.join(','));
	}
} else if (args[0].match(/\d+/g).length = 2){

	var numbers  = args[0].match(/\d+/g);

	if(parseInt(numbers[1] > 300) || parseInt(numbers[0]) > 300){
		message.channel.send("One number was too high");
	} else {

	console.log(numbers);

			var result = rpgdice.roll(numbers[0] + "d" + numbers[1]);

		if(!result.result){
			message.channel.send("Incorrect syntax");
		}

		if(result.rolls.length > 50) return message.channel.send("Too many dice");
		message.channel.send("Result: " + result.result +
                        "\n" + "Individual: " + result.rolls.join(','));
	}
} else {
	return message.channel.send("Invalid Syntax");
}

	}        
}