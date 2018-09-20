const Discord = require('discord.js');

exports.run = (client, message, args, deletedMessage, talkedRecently, embeddedRecently, weatheredRecently, commandCount, coinsSet, roles, queue, sql) => {

	//return message.channel.send("This command is temporarily disabled");
	
    var kitSupport = client.guilds.find('id', '449263514436239360');
    var donorArray = kitSupport.roles.find('id', '479013774880276502').members.array();
    var donorIDArray = [];
    
    var i = 0;
    while((i+1) <= donorArray.length){
        donorIDArray[i] = donorArray[i].user.id;
        i = i+1;
    }


    var IDarray = donorIDArray;

	if(args[0] === "add"){
		//trigger 24hr cooldown
		if (coinsSet.has(message.author.id)) {
			return message.reply("There is a 24 hour cooldown on this command, try again later");
		} else {
		coinsSet.add(message.author.id);
		setTimeout(() => {
		  coinsSet.delete(message.author.id);
		}, 86400000);
		//execute module here
		sql.get(`SELECT quarters FROM profile WHERE userId ="${message.author.id}"`).then(row => {
			if(!row){
				//make profile first
				const embed = new Discord.RichEmbed()
					.setColor(0xF46242)
					.setTimestamp()
					.setDescription("Create a profile first")
					.setFooter("Use `k?profile`")
					message.channel.send({embed});

			} else {
				if(donorIDArray.includes(message.author.id)){
					sql.run(`UPDATE profile SET quarers = "${parseInt(row.quarters) + 4}" WHERE userId = "${message.author.id}"`);
		const embed = new Discord.RichEmbed()

				.setTimestamp()
				.setDescription("You got 4 quarters")
				message.channel.send({embed});
				} else {
		sql.run(`UPDATE profile SET quarters = "${parseInt(row.quarters) + 1}" WHERE userId = "${message.author.id}"`);
		const embed = new Discord.RichEmbed()

				.setTimestamp()
				.setDescription("You got a quarter")
				message.channel.send({embed});
				}
				}
			//you got one point
			

		}).catch((err) => {
					const embed = new Discord.RichEmbed()
					.setColor(0xF46242)
					.setTimestamp()
					.setDescription("An error occured")
					.setFooter(err)
					message.channel.send({embed});
		});
		}

	} else if(args[0] === "get"){
		//search for user
		sql.get(`SELECT quarters FROM profile WHERE userId ="${args[0]}"`).then(row => {
			if(!row){
				//make profile first
				const embed = new Discord.RichEmbed()
					.setColor(0xF46242)
					.setTimestamp()
					.setDescription("Create a profile first")
					.setFooter("Use `k?profile`")
					message.channel.send({embed});

			} else {
		//sql.run(`UPDATE profiles SET quarters = "${row.quarters + 1}" WHERE userId = "${message.author.id}"`);
		const embed = new Discord.RichEmbed()

				.setTimestamp()
				.setDescription("This user has " + row.quarters + " quarters")
				message.channel.send({embed});
				}
			//you got one point
			

		});

	} else if(args[0] === "give"){

		if(message.author.id === "378769654942007299"){
			sql.run(`UPDATE profile SET quarters = "${args[1]}" WHERE userId = "${args[2]}"`);
		}

	} else {
		//display sender's
		sql.get(`SELECT quarters FROM profile WHERE userId ="${message.author.id}"`).then(row => {
			if(!row){
				//make profile first
				const embed = new Discord.RichEmbed()
					.setColor(0xF46242)
					.setTimestamp()
					.setDescription("Create a profile first")
					.setFooter("Use k?profile create")
					message.channel.send({embed});

			} else {
				if (coinsSet.has(message.author.id)) {
		//sql.run(`UPDATE profiles SET quarters = "${row.quarters + 1}" WHERE userId = "${message.author.id}"`);
		const embed = new Discord.RichEmbed()

				.setTimestamp()
				.setColor(0xF46242)
				.setDescription("You have " + row.quarters + " quarters")
				message.channel.send({embed});
				
			} else {
				const embed = new Discord.RichEmbed()

				.setTimestamp()
				.setColor(0x32ff58)
				.setDescription("You have " + row.quarters + " quarters")
				message.channel.send({embed});
			}
			//you got one point
			
		}
		});

  }

}

exports.conf = {
    DM:  true,
    OwnerOnly: false
}
