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
		sql.get(`SELECT * FROM profile WHERE userId ="${message.author.id}"`).then(row => {
		
			if(!row){
				const embed = new Discord.RichEmbed()
					.setColor(0xF46242)
					.setTimestamp()
					.setDescription("Create a profile first")
					.setFooter("Use k?profile create")
					message.channel.send({embed});
			} else {
		
		if(message.createdTimestamp > row.qTime || !row.qTime){

				if(donorIDArray.includes(message.author.id)){
					sql.run(`UPDATE profile SET quarters = "${parseInt(row.quarters) + 4}" WHERE userId = "${message.author.id}"`);
					sql.run(`UPDATE profile SET qTime = "${message.createdTimestamp + 24*60*60*1000}" WHERE userId = "${message.author.id}"`);

				const embed = new Discord.RichEmbed()

					.setDescription("You got 4 quarters")
					.setFooter(row.qTime)
				message.channel.send({embed});
				} else {
					sql.run(`UPDATE profile SET quarters = "${parseInt(row.quarters) + 1}" WHERE userId = "${message.author.id}"`);
					sql.run(`UPDATE profile SET qTime = "${message.createdTimestamp + 24*60*60*1000}" WHERE userId = "${message.author.id}"`);

				const embed = new Discord.RichEmbed()

					.setTimestamp()
					.setDescription("You got a quarter")
				message.channel.send({embed});
				}

			} else {
				return message.reply("There is a 24 hour cooldown on this command, try again later");
			}
	  }
	});
    } else if(args[0] === "raw"){

		sql.get(`SELECT * FROM profile WHERE userId ="${message.author.id}"`).then(row => {

				const embed = new Discord.RichEmbed()
					.setColor(0xF46242)
					.addField('userId', row.userId)
					.addField('quarters', row.quarters)
					.addField('badge', row.badge)
					.addField('desc', row.desc)
					.addField('color', row.color)
					.addField('cmds', row.cmds)
					.addField('bg', row.bg)
					.addField('qTime', row.qTime)
				message.channel.send({embed});

		});

	} else if(args[0] === "leaderboard"){

		sql.all(`SELECT * FROM profile`).then(row => {

			//console.log(row);
			//console.log(row.length);

			var i = 1;
			var ar = [];
			while(i < row.length){
				ar[i-1] = {
					userId: row[i-1].userId,
					quarters: parseInt(row[i-1].quarters)
				};
				i = i + 1;
			}


				ar = ar.sort(function(a, b) {
					return parseFloat(b.quarters) - parseFloat(a.quarters);
				});

			const embed = new Discord.RichEmbed()
					.setDescription('```' + 
						"\n" + ar[0].userId + " - " + ar[0].quarters +
						"\n" + ar[1].userId + " - " + ar[1].quarters +
						"\n" + ar[2].userId + " - " + ar[2].quarters +
						"\n" + ar[3].userId + " - " + ar[3].quarters +
						"\n" + ar[4].userId + " - " + ar[4].quarters +
			        + '```')
			message.channel.send({embed});

		});

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
				sql.get(`SELECT * FROM profile WHERE userId ="${message.author.id}"`).then(row => {
				if (message.createdTimestamp > row.qTime || !row.qTime) {
					const embed = new Discord.RichEmbed()

						.setTimestamp()
						.setColor(0x32ff58)
						.setDescription("You have " + row.quarters + " quarters")
					message.channel.send({embed});
			} else {
				const embed = new Discord.RichEmbed()

				.setTimestamp()
				.setColor(0xF46242)
				.setDescription("You have " + row.quarters + " quarters")
				message.channel.send({embed});
			}
			//you got one point
			});
		}
		});

  }

}

exports.conf = {
    DM: true,
    OwnerOnly: false
}
