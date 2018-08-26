const Discord = require("discord.js");

exports.run = (client, message, args, deletedMessage, talkedRecently, embeddedRecently, weatheredRecently, commandCount, coinsSet, roles, queue, sql) => {

	if(message.author.id){ //

    var kitSupport = client.guilds.find('id', '449263514436239360');
					var donorArray = kitSupport.roles.find('id', '479013774880276502').members.array();
					var donorIDArray = [];
					
					var i = 0;
					while((i+1) <= donorArray.length){
						donorIDArray[i] = donorArray[i].user.id;
						i = i+1;
					}


                    var IDarray = donorIDArray;

                    var games = [
                        "<:bulb:476445588418723841>" ,"<:kip:476445588951400480>" ,"<:calamus:476445589031092235>" ,"<:rue:476445589488271362>" ,
                        "<:prophet:476445589568225291>" ,"<:proto:476445589572419584>" ,"<:plight:476445589580677143>" ,"<:rowbot:476445589593260053>" ,
                        "<:silver:476445589635072010>" ,"<:niko:476445589710700545>" ,"<:alula:476445589845049375>" ,"<:casual:476445620131987456>" ,
                        "<:icon:476445620207616009>" ,"<:godess:476445620689960981>" ,"<:fishbunjin:476445620975042579>" ,"<:ruby:476445621616902154>" ,
                        "<:jenny:476445621969223681>" ,"<:ittle_dew:476445621973286922>" ,"<:remedy:476445622078275599>" ,"<:gmod:476445649139793931>" ,
                        "<:tf2:476445649496309822>" ,"<:magpie:476446147544875018>" ,"<:cedric:476446147741745175>" ,"<:neko_atsume:476505925281251350>" ,
                        "<:cultist:476506134157459496>" ,"<:convict:476506134203727872>" ,"<:hunter:476506134367174667>" ,"<:marine:476506134690398209>" ,
                        "<:icon:476506134753181706>" ,"<:robot:476506134812033024>" ,"<:pilot:476506134946250752>" ,"<:icon:476506176985628673>" ,
                        "<:dva:476506178185330688>" ,"<:reaper:476506179523313664>" ,"<:tracer:476506180014047262>" ,"<:mccree:476506180550918154>" ,
                        "<:mercy:476506180613701633>" ,"<:mei:476506180714233876>" ,"<:sombra:476506180890394643>" ,"<:reinhardt:476506180928143360>" ,
                        "<:arceus:476510622121459723>" ,"<:rayquaza:476510621806886913>", "<:lucario:476961723912421376>" ,"<:greninja:476510621790371852>" ,"<:pikachu:476510621949493273>" ,
                        "<:sylveon:476510622020796427>" ,"<:mew:476510622247419917>", "<:mimikyu:478273923763535873>" ,"<:icon:476510622352408576>","<:icon:476514178031681556>" ,
                        "<:emily:476514177742143530>" ,"<:grandpa:476514177641611266>" ,"<:hench:476514177918304288>" ,"<:krobus:476514178098528256>" ,
                        "<:shane:476514178132344832>" ,"<:abigail:476514177712652289>" ,"<:alex:476514178010578964>" ,"<:dwarf:476514177872035872>" ,
                        "<:vincent:476514178224488460>" ,"<:doggo:476516801761771530>" ,"<:napstablook:476516801765703681>" ,"<:papyrus:476516801446936592>" ,
                        "<:temmie:476516801648394241>" ,"<:ice_cap:476516801774354442>" ,"<:toriel:476516801770160140>" ,"<:dog:476516801858240522>" ,
                        "<:undyne:476516801929543730>" ,"<:woshua:476516801610514435>" ,"<:steam:314349923044687872>" ,"<:devil:476281476384555008>", "<:sadcat:476961723979661332>", "<:berd:476962929569169438>", "<:rover:476963250592940055>", "<:trash:477280600751865857>",
                        "<:icon:477681496216567810>" ,  "<:excalibur:477681493888598016>" ,  "<:mag:477681493775351833>" , "<:volt:477681494198845462>", 
                        "<:icon:478274648048664577>", "<:baby:478274647779966978>", "<:darksamussuit:478274649856147457>", "<:samussuit:478274649365413898>", "<:zerosamus:478274647893213185>", "<:kraid:478274647981555743>", "<:Ridley:478274648107122698>",
                        "<:placeholder:123456>" //<<---- DO NOT REMOVE
                    ];
	/*
	 Games:
            1. Slap City
            2. TF2
            3. GMod
            4. Oneshot
            5. Neko Atsume
            6. VA-11 Hall-A
            7. Overwatch
            8. Enter the Gungeon
            9. Warframe
            10. Pokemon
            11. Stardew Valley
            12. Undertale
            13. Left for dead
            14. Dota 
            15. Steam
            16. Watch Dogs
	*/


	var staff = [
		"454461184792461312",
		"378769654942007299"
	];

	var testers = [
		"160861202040356867",
		"454461184792461312"
	];

	var devs = [
		"378769654942007299",
		"454461184792461312"
	];

	//boat adventurrrreeee
	var cutes = [
		"166365757561634816",
		"317967932745580544",
		"204890104349589504",
		"454461184792461312",
		"382608240250322953"
	]
	
	var blacklist = ["123"];


		try{

		//PROFILE CREATION - EXECUTES ON COMMAND USE REGARDLESS OF WANT TO CREATE
		sql.get(`SELECT * FROM profiles WHERE userId ="${message.author.id}"`).then(row => {
			async function profileA(){
			if (!row) {
			  await sql.run("INSERT INTO profiles (userId, username, avatar, desc, title, rep, toRep) VALUES (?, ?, ?, ?, ?, ?, ?)", [message.author.id, message.author.username, message.author.avatarURL, "Description not set", "User", 4, 10]);
			} 

			async function log(str) {

				var stringVar = await row.title;
				console.log(`Profile information created or accesed by/for: USER ID ${str}`)
			}

			//log(row.userID);
		}
		profileA();
		  }).catch(() => {
			//console.error;
			sql.run("CREATE TABLE IF NOT EXISTS profiles (userId TEXT, username TEXT, avatar TEXT, desc TEXT, title TEXT, rep INTEGER, toRep INTEGER)").then(() => {
			  sql.run("INSERT INTO profiles (userId, username, avatar, desc, title, rep, toRep) VALUES (?, ?, ?, ?, ?, ?, ?)", [message.author.id, message.author.username, message.author.avatarURL, "Description not set", "User", 4, 10]);
			});
		  });

			
			//Update
			sql.run(`UPDATE profiles SET username = "${message.author.username}" WHERE userId = ${message.author.id}`);
			sql.run(`UPDATE profiles SET avatar = "${message.author.avatarURL}" WHERE userId = ${message.author.id}`);
				
		  //PROFILE COMMAND No-Args
		  if(!args[0]){
			//Fetch from database  
			sql.get(`SELECT * FROM profiles WHERE userId ="${message.author.id}"`).then(row => {

				async function log(str) {

					var stringVar = await row.title;
					console.log(`Profile information created or accesed by/for: USER ID ${str}`)
				}
	
				//log(row.userID);
				//embed data fetched
	try{

		var rowTitle = row.title;
		var rowName = row.username;

		/*

					DONORS

					*/
					var kitSupport = client.guilds.find('id', '449263514436239360');
					var donorArray = kitSupport.roles.find('id', '479013774880276502').members.array();
					var donorIDArray = [];
					
					var i = 0;
					while((i+1) <= donorArray.length){
						donorIDArray[i] = donorArray[i].user.id;
						i = i+1;
					}

					if(donorIDArray.includes(row.userId)){
						rowTitle = "<:donorbadge:479757981949493268> " + rowTitle;
					}

					/*

					TESTERS

					*/

					var kitSupport = client.guilds.find('id', '449263514436239360');
					var testerArray = kitSupport.roles.find('id', '449816994225717248').members.array();
					var testerIDArray = [];
					
					var i = 0;
					while((i+1) <= testerArray.length){
						testerIDArray[i] = testerArray[i].user.id;
						i = i+1;
					}

					//Testers/help
					if(testerIDArray.includes(row.userId)){
						rowTitle = "<:tester:476431555561127957> " + rowTitle;
					}

					/*

					OTHERS

					*/
						
					if(staff.includes(row.userId)){
						rowTitle = "<:staff:314068430787706880> " + rowTitle;
					}

					if(devs.includes(row.userId)){
						rowName = rowName + " <:dev:476499788666503168>";
					} else if(donorIDArray.includes(row.userId)){
						rowName = rowName + " <:donor:479417491840303114>"; //REPLACE WITH DNR
					} else {
						rowName = rowName + " <:user:477316180638695426>";
					}

					if(cutes.includes(row.userId)){
						rowTitle = "<:boatadventure:478057319989510173> " + rowTitle;
					}

		if(blacklist.includes(message.author.id)) return;

		//message.channel.send("\"" + row.id + "\"")

				const embed = new Discord.RichEmbed()
				.setDescription(`${rowTitle} Profile`)
				
				.setFooter("Use `profile desc \"description\"` to customize")
				.setThumbnail(client.users.find("id", row.userId).avatarURL)
				.addField("Username", `${rowName}`)
				.addField("Quarters", `${row.rep} ($${row.rep / 4})`)
				//.addField("User ID", `${row.userId}`)
				.addField("Description", `${row.desc}`)
				message.channel.send({embed});
	}
	catch(err){
		const embed = new Discord.RichEmbed()
		
		//.setTimestamp() //Write to JSON
		.setTitle("Profile Created")
		.setFooter("Type `k?profile` again to view it");
		//.setFooter(err)
		message.channel.send({embed});
	}
			  }).catch();

		  } else if(args[0] === "desc" || args[0] === "description"){
			sql.get(`SELECT * FROM profiles WHERE userId ="${message.author.id}"`).then(row => {
				if(!row){
					const embed = new Discord.RichEmbed()
						.setColor(0xF46242)
						.setTimestamp() //Write to JSON
						.setTitle("Profile does not exist (Invalid ID or not yet created)")
						return message.channel.send({embed});
						return;
				} else {
				
			
				if(!args[1]) return;



				var argVar = args.join(' ');
				var descVar = argVar.replace(args[0], "");

				if(argVar.length > 175){
					const embed = new Discord.RichEmbed()
				.setColor(0xF46242)
				.setTimestamp() //Write to JSON
				.setTitle("Description exceeded character limit (175)")
				message.channel.send({embed});
				} else {

				sql.run(`UPDATE profiles SET desc = "${descVar.replace(new RegExp("\"", 'g'), "")}" WHERE userId = "${message.author.id}"`);

				const embed = new Discord.RichEmbed()
				
				.setTimestamp()
				.setTitle("Description updated: " + descVar)
				message.channel.send({embed});
				}
			}
			});
		  	} else if(args[0] === "badges"){
				


					if(blacklist.includes(argsVar)) return;

					if(args[1] === "equip"){

						sql.get(`SELECT * FROM profiles WHERE userId ="${message.author.id}"`).then(row => {

							if(!row){
								const embed = new Discord.RichEmbed()
					.setColor(0xF46242)
					.setTimestamp()
					.setDescription("Create a profile first")
					.setFooter("Use `profile`")
					message.channel.send({embed});

					
							} else {

						if(!args[2] || !games[parseInt(args[2]) - 1]) return message.channel.send("Badge number invalid or not given, use `profile badges remove` to remove your badges");

						if(parseInt(row.rep) < 4){

							const embed = new Discord.RichEmbed()
						.setColor(0xF46242)
						.setTimestamp() //Write to JSON
						.setTitle("You don't have enough coins (4 required)")
						message.channel.send({embed});

						} else {

						sql.run(`UPDATE profiles SET title = "${games[parseInt(args[2]) - 1]} User" WHERE userId = "${message.author.id}"`).then(()=>{
							const embed = new Discord.RichEmbed()
				
				.setTimestamp() //Write to JSON
				.setTitle("Title Updated")
				message.channel.send({embed});
						}).catch(() => {
							//console.error;
							const embed = new Discord.RichEmbed()
						.setColor(0xF46242)
						.setTimestamp()
						.setTitle("Profile does not exist (Invalid ID or not yet created)")
						message.channel.send({embed});
							});

							sql.run(`UPDATE profiles SET rep = "${row.rep - 4}" WHERE userId = "${message.author.id}"`)
						}

						}
						});

					}else if(args[1] === "customequip"){
						if(!args[2]){
							//No emoji given
							const embed = new Discord.RichEmbed()
						.setColor(0xF46242)
						.setTimestamp()
						.setTitle("You have to give an emoji `profile badges customequip :emote:`")
						message.channel.send({embed});

						} else {
						var emojiID = args[2].replace(/\D/g,'');

							if(!client.emojis.has(emojiID)){
								//Emoji not found
								const embed = new Discord.RichEmbed()
						.setColor(0xF46242)
						.setTimestamp()
						.setTitle("I don't have that emoji `profile badges customequip :emote:`")
						.setFooter("ID: " + emojiID)
						message.channel.send({embed});

							} else {

								sql.get(`SELECT * FROM profiles WHERE userId ="${message.author.id}"`).then(row => {

									if(!row){
										const embed = new Discord.RichEmbed()
						.setColor(0xF46242)
						.setTimestamp()
						.setDescription("Create a profile first")
						.setFooter("Use `profile`")
						message.channel.send({embed});
									} else {
										if(IDarray.includes(message.author.id)){										
					
											sql.run(`UPDATE profiles SET title = "${"<:custom:" + emojiID + ">"} User" WHERE userId = "${message.author.id}"`).then(()=>{
												const embed = new Discord.RichEmbed()
									
									.setTimestamp() //Write to JSON
									.setTitle("Title Updated")
									message.channel.send({embed});
											}).catch(() => {
												//console.error;
												const embed = new Discord.RichEmbed()
											.setColor(0xF46242)
											.setTimestamp()
											.setTitle("Profile does not exist (Invalid ID or not yet created)")
											message.channel.send({embed});
												});
					
												//sql.run(`UPDATE profiles SET rep = "${row.rep - 16}" WHERE userId = "${message.author.id}"`)
											
										} else {

										//update code and conformation
										if(parseInt(row.rep) < 16){

											const embed = new Discord.RichEmbed()
										.setColor(0xF46242)
										.setTimestamp() //Write to JSON
										.setTitle("You don't have enough coins (16 required)")
										message.channel.send({embed});
				
										} else {
				
										sql.run(`UPDATE profiles SET title = "${"<:custom:" + emojiID + ">"} User" WHERE userId = "${message.author.id}"`).then(()=>{
											const embed = new Discord.RichEmbed()
								
								.setTimestamp() //Write to JSON
								.setTitle("Title Updated")
								message.channel.send({embed});
										}).catch(() => {
											//console.error;
											const embed = new Discord.RichEmbed()
										.setColor(0xF46242)
										.setTimestamp()
										.setTitle("Profile does not exist (Invalid ID or not yet created)")
										message.channel.send({embed});
											});
				
											sql.run(`UPDATE profiles SET rep = "${row.rep - 16}" WHERE userId = "${message.author.id}"`)
										}

									}
									}

								});

							}

						}
					}else if(args[1] === "remove"){

							sql.get(`SELECT * FROM profiles WHERE userId ="${message.author.id}"`).then(row => {
	
								if(!row){
									const embed = new Discord.RichEmbed()
						.setColor(0xF46242)
						.setTimestamp()
						.setDescription("Create a profile first")
						.setFooter("Use `profile`")
						message.channel.send({embed});
	
						
								} else {
	
	
							sql.run(`UPDATE profiles SET title = "User" WHERE userId = "${message.author.id}"`).then(()=>{
								const embed = new Discord.RichEmbed()
					
					.setTimestamp() //Write to JSON
					.setTitle("Title Updated")
					message.channel.send({embed});
							}).catch(() => {
								//console.error;
								const embed = new Discord.RichEmbed()
							.setColor(0xF46242)
							.setTimestamp() //Write to JSON
							.setTitle("Profile does not exist (Invalid ID or not yet created)")
							message.channel.send({embed});
								});
	
							}
							});
						  
					  } else if (!isNaN(args[1])){
						  var it = 0;
						  var list = [];

						  while((it + 1) < games.length){
							list[it] = " **" + (it+1) + "**: " + games[it];
							it = it + 1;
						  }

						  function chunkArray(myArray, chunk_size){
							var index = 0;
							var arrayLength = myArray.length;
							var tempArray = [];
							
							for (index = 0; index < arrayLength; index += chunk_size) {
								myChunk = myArray.slice(index, index+chunk_size);
								// Do something if you want with the group
								tempArray.push(myChunk);
							}
						
							return tempArray;
						}
			
						// Split in group of 3 items
						list = chunkArray(list, 4);

						var lists = chunkArray(list, 5);

						var pagenum = parseInt(args[1]);

						if(!lists[pagenum - 1]){
							const embed = new Discord.RichEmbed()
					.setColor(0xF46242)
					.setTimestamp() //Write to JSON
					.setTitle("Invalid page number")
					.setDescription("There are " + (lists.length) + " pages");
					message.channel.send({embed});
						} else {
							const embed = new Discord.RichEmbed()
					
					.setTitle("Badges (4 coins) - Page " + pagenum + "/" + lists.length)
					.setDescription(lists[pagenum - 1])
					.setFooter("Use `profile badges equip #` to recieve a badge")
					message.channel.send({embed});
						}

						/*
						  const embed = new Discord.RichEmbed()
					
					.setTitle("Badges")
					.setDescription(lists[0])
					.setFooter("Use `profile badges equip #` to recieve a badge")
					message.channel.send({embed});

					const embed2 = new Discord.RichEmbed()
					
					.setDescription(lists[1])
					.setFooter("Use `profile badges equip #` to recieve a badge")
					message.channel.send({embed: embed2});
*/
					  } else {
						  //invalid command
						  const embed = new Discord.RichEmbed()
					.setColor(0xF46242)
					.setTimestamp() //Write to JSON
					.setTitle("Usage")
					.setDescription("`profile badges <page number>`");
					message.channel.send({embed});
					  }

					  /*
					}).catch(() => {
					//console.error;
					const embed = new Discord.RichEmbed()
				.setColor(0xF46242)
				.setTimestamp() //Write to JSON
				.setTitle("Profile does not exist (Invalid ID or not yet created)")
				message.channel.send({embed});
					});
					*/
		

			} else if(args[0] === "size"){

				if(!message.author.id === "378769654942007299") return;
				
				sql.all(`SELECT userID FROM profiles`).then(row => {

					var contentVar = JSON.stringify(row, null, 2);

					//console.log(Object.keys(contentVar).length);
					//console.log(contentVar)
				const embed = new Discord.RichEmbed()
				
				.setTimestamp() //Write to JSON
				.setTitle("There are " + (row.length) + " profiles stored")
				message.channel.send({embed});
				});
			
			} else if(args[0] === "settitle"){
				if(message.author.id === "378769654942007299"){
					
					var specialVar = args.join(' ');
					specialVar = specialVar.replace(args[0], "");
					specialVar = specialVar.replace(args[1], "");

					sql.run(`UPDATE profiles SET title = "${specialVar}" WHERE userId = "${args[1]}"`);

					const embed = new Discord.RichEmbed()
					
					.setTimestamp() //Write to JSON
					.setTitle("Title Updated")
					message.channel.send({embed});
				} else {
					const embed = new Discord.RichEmbed()
					.setColor(0xF46242)
					.setTimestamp() //Write to JSON
					.setTitle("Permission denied")
					.setDescription("Bot Owner required")
					message.channel.send({embed});
				}
			} /*else if(args[0] === "repgive"){

				var repToGive;
				var repRecieved;

				if(!args[1]) return message.channel.send("No arguments");

				var idVar = args[1].replace("<@", "").replace("!", "").replace(">", "");

				sql.get(`SELECT rep FROM profiles WHERE userID ="${message.author.id}"`).then(row => {
					console.log("fetched1");
					if(!row){
						const embed = new Discord.RichEmbed()
						.setTitle("No Profile Found")
						.setDescription("Either you have no profile, or the user you are giving to does not")
						return message.channel.send(embed);
					}
					
					repToGive = row.rep;

					if(repToGive = 0){
						console.log("fetched2");
						const embed = new Discord.RichEmbed()
						.setDescription("You have no rep to give")
						return message.channel.send(embed);
					}

				});

				sql.get(`SELECT rep FROM profiles WHERE userID ="${idVar}"`).then(row => {
					console.log("fetched3");
					if(!row){
						const embed = new Discord.RichEmbed()
						.setTitle("No Profile Found")
						.setDescription("Either you have no profile, or the user you are giving to does not")
						return message.channel.send(embed);
					}	

					repRecieved = row.toRep;	

				});

				sql.run(`UPDATE profiles SET rep = ${repToGive - 1} WHERE userId = "${message.author.id}"`);
				console.log("fetched4");
				sql.run(`UPDATE profiles SET rep = ${repRecieved + 1} WHERE userId = "${idVar}"`);
				console.log("fetched5");

				message.channel.send("You have given 1 repuation point");

				

			//} else if(args[0] === "repremove"){

			}*/ else {

				var argsVar = args.join(' ');
				argsVar = argsVar.replace("<@!", "");
				argsVar = argsVar.replace("<@", "");
				argsVar = argsVar.replace(">", "");

				sql.get(`SELECT * FROM profiles WHERE userId ="${argsVar}"`).then(row => {


					if(blacklist.includes(argsVar)) return;

					var rowTitle = row.title;
					var rowName = row.username;

					//client.guilds.find('id', '449263514436239360');

					/*

					DONORS

					*/
					var kitSupport = client.guilds.find('id', '449263514436239360');
					var donorArray = kitSupport.roles.find('id', '479013774880276502').members.array();
					var donorIDArray = [];
					
					var i = 0;
					while((i+1) <= donorArray.length){
						donorIDArray[i] = donorArray[i].user.id;
						i = i+1;
					}

					if(donorIDArray.includes(row.userId)){
						rowTitle = "<:donorbadge:479757981949493268> " + rowTitle;
					}

					/*

					TESTERS

					*/

					var kitSupport = client.guilds.find('id', '449263514436239360');
					var testerArray = kitSupport.roles.find('id', '449816994225717248').members.array();
					var testerIDArray = [];
					
					var i = 0;
					while((i+1) <= testerArray.length){
						testerIDArray[i] = testerArray[i].user.id;
						i = i+1;
					}


					//Testers/help
					if(testerIDArray.includes(row.userId)){
						rowTitle = "<:tester:476431555561127957> " + rowTitle;
					}

					/*

					OTHERS

					*/
						
					if(staff.includes(row.userId)){
						rowTitle = "<:staff:314068430787706880> " + rowTitle;
					}

					if(devs.includes(row.userId)){
						rowName = rowName + " <:dev:476499788666503168>";
					} else if(donorIDArray.includes(row.userId)){
						rowName = rowName + " <:donor:479417491840303114>"; //REPLACE WITH DNR
					} else {
						rowName = rowName + " <:user:477316180638695426>";
					}

					if(cutes.includes(row.userId)){
						rowTitle = "<:boatadventure:478057319989510173> " + rowTitle;
					}

					const embed = new Discord.RichEmbed()
					.setDescription(`${rowTitle} Profile`)
					
					.setFooter("Report innapropriate content with `reportprofile <user id>`")
					.setThumbnail(client.users.find("id", row.userId).avatarURL)
					.addField("Username", `${rowName}`)
					.addField("Quarters", `${row.rep} ($${row.rep / 4})`)
					//.addField("User ID", `${row.userId}`)
					.addField("Description", `${row.desc}`)
					message.channel.send({embed});

					}).catch((err) => {
					//console.error;
					const embed = new Discord.RichEmbed()
				.setColor(0xF46242)
				.setTimestamp() //Write to JSON
				.setTitle("Profile does not exist (Invalid ID or not yet created)")
				.setFooter(err)
				message.channel.send({embed});
					});
		
			}
		}
		
		catch(err){
			const embed = new Discord.RichEmbed()
		.setColor(0xF46242)
		.setTimestamp() //Write to JSON
		.setTitle("Error")
		.setFooter(err)
		message.channel.send({embed});
		}

	} else {
		const embed = new Discord.RichEmbed()
		.setColor(0xF46242)
		.setTimestamp() //Write to JSON
		.setTitle("This command is locked")
		message.channel.send({embed});
	}
}