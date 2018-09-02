const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");
let settings = [];
let data = JSON.parse(fs.readFileSync("./JSON/data.json", "utf8"));

//Temporary data sets - resets when the bot does
const deletedMessage = new Set();
const talkedRecently = new Set();
const embeddedRecently = new Set();
const weatheredRecently = new Set();
const commandCount = new Set();
const coinsSet = new Set();
const roles = new Set();
const tossedSet = new Set();
let queue = {}; //NOTE - this can probably be removed

//SQLite database file
const sql = require("sqlite");
sql.open("./tags.sqlite");

//Event loader (for events that aren't in this file)
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];

    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

//Welcome message handler, reads from 'prefixes' table
client.on("guildMemberAdd", (member) => {

	if(member.bot) return;

  sql.get(`SELECT * FROM prefixes WHERE serverId ="${member.guild.id}"`).then(row => {
    if(!row){
      sql.run("INSERT INTO prefixes (prefix, welcomeMessage, welcomeChannel, shouldWelcome, serverId) VALUES (?, ?, ?, ?, ?)", ["k?", "This is a placeholder", "null", "false", message.guild.id]);
      console.log("added to prefixes");
    }


    const guild = member.guild;

	if(row.shouldWelcome === "false") return;

	if(row.welcomeChannel === "null"){ return;
	} else if(row.shouldWelcome === "true"){

        async function welcome(){

        //console.log(member);

        var mbr = await member;
        var gld = mbr.guild;
        var mbr = mbr.user;
        //console.log(mbr.user);

        var WelcomeMessage = row.welcomeMessage.replace(new RegExp("{member}", 'g'), "<@" + mbr.id + ">");
        var WelcomeMessage = WelcomeMessage.replace(new RegExp("{member.username}", 'g'), mbr.username);
        var WelcomeMessage = WelcomeMessage.replace(new RegExp("{guild}", 'g'), gld.name);

        guild.channels.get(row.welcomeChannel).send(WelcomeMessage).catch((error) => {return;});
    }

    welcome();
  }

    }).catch(() => {
    console.error;
    });

    
  
});

/*

DELETES AND EDITS

*/

//Message logger
client.on("messageUpdate", async (message, oldMessage, newMessage) => {
  if(message.author.bot) return;

  var channelID = message.channel.id;

  var oldMessageVar = await oldMessage.content;
  var newMessageVar = await newMessage;

  var messageContent = message.content.replace(new RegExp(/discord(?:app\.com|\.gg)[\/invite\/]?(?:(?!.*[Ii10OolL]).[a-zA-Z0-9]{5,6}|[a-zA-Z0-9\-]{2,32})/g), "[INVITE]");
  oldMessageVar = oldMessageVar.replace(new RegExp(/discord(?:app\.com|\.gg)[\/invite\/]?(?:(?!.*[Ii10OolL]).[a-zA-Z0-9]{5,6}|[a-zA-Z0-9\-]{2,32})/g), "[INVITE]");


      if(!deletedMessage[message.guild.id + "-" + channelID]){
         deletedMessage[message.guild.id + "-" + channelID] = {
             message: message.oldMessage,
             author: message.author.tag,
             avatar: message.author.avatarURL,
             newContent: message.newMessage,
             type: "Edited"
           };
      }
      deletedMessage[message.guild.id + "-" + channelID].message = messageContent + " ⇨ " + oldMessageVar;
      deletedMessage[message.guild.id + "-" + channelID].author = message.author.username;
      deletedMessage[message.guild.id + "-" + channelID].avatar = message.author.avatarURL;
      
});

/*

DELETES AND EDITS

*/

//Message Logger
client.on("messageDelete", (message) => {


  var messageContent = (message.content).replace(new RegExp(/discord(?:app\.com|\.gg)[\/invite\/]?(?:(?!.*[Ii10OolL]).[a-zA-Z0-9]{5,6}|[a-zA-Z0-9\-]{2,32})/g), "[INVITE]");
  
      //console.log(message.channel.id);
      var channelID = message.channel.id;
  
          if(!deletedMessage[message.guild.id + "-" + channelID]){
             deletedMessage[message.guild.id + "-" + channelID] = {
                 message: messageContent,
                 author: message.author.tag,
                 avatar: message.author.avatarURL,
                 type: "Deleted"
               };
          }
          deletedMessage[message.guild.id + "-" + channelID].message = messageContent;
          deletedMessage[message.guild.id + "-" + channelID].author = message.author.username;
          deletedMessage[message.guild.id + "-" + channelID].avatar = message.author.avatarURL;
          
    });



/*

MESSAGE

*/

//On-message event
client.on("message", async message => {

  if(message.channel.type === "dm") return;

  sql.get(`SELECT * FROM prefixes WHERE serverId ="${message.guild.id}"`).then(row => {

    if(!row){
      var customPrefix = "k?";
    } else {
      var customPrefix = row.prefix;
    }

    const logChannel = client.channels.find('id', config.logChannel);
  
    if (message.author.bot) return;
  
    if(message.guild){

    sql.get(`SELECT * FROM settings WHERE serverId ="${message.guild.id}"`).then(row => {
      if(!row){
        sql.run("INSERT INTO settings (serverId, banId) VALUES (?, ?)", [message.guild.id, null]);
      }
		  }).catch(() => {
			console.error;
		  });


    sql.get(`SELECT * FROM prefixes WHERE serverId ="${message.guild.id}"`).then(row => {
      if(!row){
        sql.run("INSERT INTO prefixes (prefix, welcomeMessage, welcomeChannel, shouldWelcome, serverId) VALUES (?, ?, ?, ?, ?)", ["k?", "This is a placeholder", "null", "false", message.guild.id]);
        console.log("added to prefixes");
      }
		  }).catch(() => {
			console.error;
		  });
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
  
        //Command alias checker - messy but working
        delete require.cache[require.resolve(`./JSON/aliases.json`)];
        var aliasAR = require("./JSON/aliases.json");

        for (const key of Object.keys(aliasAR))
        if (aliasAR[key].aliases.includes(command)) command = key;
  
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
    
    if(config.evalAllow.includes(message.author.id)){
    
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

      if(message.guild){
        var messageName = message.guild.name;
      } else {
        var messageName = "DM";
      }

    console.log(message.author.username + 
       ">>\n" + messageName + 
       ">>\n" + "CMD>> '" + command + "'\n" + 
                "ARG>> " + args.join(", ") + "\n");
    console.log('\x1b[32m', "=======");
  
    logChannel.send("```\n" + message.author.username + 
      ">>" + messageName + 
      ">>\n" + "CMD>> '" + command + "'\n" + 
               "ARG>> " + args.join(", ") + "\n" + 
              "```");
  
               
  
    try {
      let commandFile = require(`./commands/${command}.js`);
      if(commandFile.conf.DM === true){
      commandFile.run(client, message, args, deletedMessage, talkedRecently, embeddedRecently, weatheredRecently,
      commandCount, coinsSet, roles, queue, sql, logChannel, settings, tossedSet);
      } else {
        const embed = new Discord.RichEmbed()
      .setColor(0xF46242)
      .setTitle("This command is disabled")
      message.channel.send({embed});
      }
    } catch (err) {
      logChannel.send("Invalid command: " + err)
      console.error("Invalid command: " + err);
      //message.channel.send("err: " + err)
    }
  }
  
  
});
});

client.login(config.token);