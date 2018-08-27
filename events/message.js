
exports.run = (client, message) => {
  const logChannel = client.channels.find('id', '479712042660528128');

  if (message.author.bot) return;

  if(message.guild){
  sql.run("CREATE TABLE IF NOT EXISTS settings (serverId TEXT, banId TEXT)").then(() => {
    sql.run("INSERT INTO settings (serverId, banId) VALUES (?, ?)", [message.guild.id, "null"]);
  });
}

  let prefixes = JSON.parse(fs.readFileSync("./JSON/prefixes.json", "utf8"));

  //Custom prefix storage
  if(!message.guild){
		
		var args = message.content.match(/[^\s"]+|"([^"]*)"/g);
		if(!args){
			var args = [];
		}

		//DM ACTIONS
		//return;
	} else {

  if(!prefixes[message.guild.id]){

    prefixes[message.guild.id] = {
        prefix: config.prefix,
        serverName: message.guild.name
      };
    
        //Write to JSON
    fs.writeFile("./JSON/prefixes.json", JSON.stringify(prefixes), (err) => {
      if (err) console.error(err)
    });
    }   
  }

  if(message.guild){
  var customPrefix = prefixes[message.guild.id].prefix;
  }
  
  var botMention = "<@" + client.user.id + ">";
  var botMentionX = "<@!" + client.user.id + ">";

  //Command handler
  if(message.guild){
  if((message.content.indexOf(config.prefix) !== 0) && 
     (message.content.indexOf(customPrefix) !== 0) &&
      (message.content.indexOf(botMention) !== 0) &&
        (message.content.indexOf(botMentionX)))  return;
  }
  
  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  var command = args.shift().toLowerCase();
  
  if(message.content.startsWith(customPrefix)){
  args = message.content.slice(customPrefix.length).trim().split(/ +/g);
  command = args.shift().toLowerCase();
  }

  if(message.content.startsWith(botMention)){
    args = message.content.slice(botMention.length).trim().split(/ +/g);
    command = args.shift().toLowerCase();
    }

    if(message.content.startsWith(botMentionX)){
      args = message.content.slice(botMentionX.length).trim().split(/ +/g);
      command = args.shift().toLowerCase();
      }

  //Aliases
  if(command === "gulag"){command = "roleban";}
  if(command === "prune"){command = "purge";}
  if(command === "t"){command = "tag";}
  if(command === "pong"){command = "ping";}
  if(command === "setprefix"){command = "prefix";}
  if(command === "stats"){command = "info";}
  if(command === "avy"){command = "avatar";}
  if(command === "yt"){command = "youtube";}
  if(command === "bun" || command === "bunny"){command = "rabbit";}
  if(command === "should" || command === "was" || command === "did" || command === "can" || command === "may" || command === "is" || command === "do" || command === "will" || command === "does" || command === "am" || command === "are"){ command = "8ball";}
  if(command === "cuddle"){command = "hug";}
  if(command === "pet" || command === "pap"){command = "pat";}
  if(command === "boop"){command = "poke";}
  if(command === "nyah" || command === "nya" || command === "mow" || command === "kitty"){command = "cat";}

  //These commands don't work in DMs
  var DMCommands = [
    "ban", "kick", "checkprefix",
    "prefix", "purge", "reportbug",
    "roleban", "snipe", "tag",
    "unroleban", "weather", "reportprofile"
  ];

  if(DMCommands.includes(command) && message.channel.type === "dm"){
    const embed = new Discord.RichEmbed()
    .setColor(0xF46242)
    .setTimestamp() //Write to JSON
    .setTitle("This command is disabled in DMs")
    message.channel.send({embed});
  } else {

  //Eval
  if(command === "eval"){
    async function evalCMD(){
      //message.guild.members.find("displayName", "Kab").id
     // admin.eval(sql, axios, birb, os, defaultColor, client, message, args, data, fs, neko, nekoClient, help, settings);
  //new 
  function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
    }
  
  if(message.author.id === "378769654942007299" || message.author.id === "454461184792461312"){
  
  try {
    const code = args.join(" ");
    let evaled = eval(code);
  
    if (typeof evaled !== "string")
    evaled = require("util").inspect(evaled);
  
    message.channel.send(clean(evaled), {code:"xl"});
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
  
  } else {
    const embed = new Discord.RichEmbed()
    .setColor(0xF46242)
    .setTimestamp() //Write to JSON
    .setTitle("You do not have permission to do this. (Bot Owner required)")
    message.channel.send({embed});
      }
      //new
    }
  
    evalCMD();
  } else if(command === "sql"){
    if(message.author.id === config.owner){
      sql.run(`${args.join(' ')}`).then(()=>{
          message.channel.send("Sent");
      }).catch((err) => {
          message.channel.send("ERR: " + err);
      });
    }
  } else {
  console.log(message.author.username + 
     ">>\n" + "CMD>> '" + command + "'\n" + 
              "ARG>> " + args.join(", ") + "\n");
  console.log('\x1b[32m', "=======");

  logChannel.send("```" + message.author.username + 
    ">>\n" + "CMD>> '" + command + "'\n" + 
             "ARG>> " + args.join(", ") + "\n" + 
             "=======```");

             

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args, deletedMessage, talkedRecently, embeddedRecently, weatheredRecently,
    commandCount, coinsSet, roles, queue, sql, logChannel, settings);
  } catch (err) {
    logChannel.send("Invalid command: " + err)
    console.error("Invalid command: " + err);
    //message.channel.send("err: " + err)
  }
}
}
}