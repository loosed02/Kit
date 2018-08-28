const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");
let settings = JSON.parse(fs.readFileSync("./JSON/settings.json", "utf8"));
let data = JSON.parse(fs.readFileSync("./JSON/data.json", "utf8"));

const deletedMessage = new Set();
const talkedRecently = new Set();
const embeddedRecently = new Set();
const weatheredRecently = new Set();
const commandCount = new Set();
const coinsSet = new Set();
const roles = new Set();
const tossedSet = new Set();
let queue = {};

//sqlite
const sql = require("sqlite");
sql.open("./tags.sqlite");

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];

    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("guildMemberAdd", (member) => {

	if(member.bot) return;

	    const guild = member.guild;

	if(!settings[guild.id]){ settings[guild.id] = {shouldWelcome: "false", welcomeMessage: "this is a placeholder", welcomeChannel: "null", serverName: guild.name, serverID: guild.id, serverOwner: guild.owner_id };}

	if(settings[guild.id].shouldWelcome === "false") return;

	if(settings[guild.id].welcomeChannel === "null"){ return;
	} else if(settings[guild.id].shouldWelcome === "true"){

        async function welcome(){

        //console.log(member);

        var mbr = await member;
        var gld = mbr.guild;
        var mbr = mbr.user;
        //console.log(mbr.user);

        var WelcomeMessage = settings[guild.id].welcomeMessage.replace(new RegExp("{member}", 'g'), "<@" + mbr.id + ">");
        var WelcomeMessage = WelcomeMessage.replace(new RegExp("{member.username}", 'g'), mbr.username);
        var WelcomeMessage = WelcomeMessage.replace(new RegExp("{guild}", 'g'), gld.name);

        guild.channels.get(settings[guild.id].welcomeChannel).send(WelcomeMessage).catch((error) => {return;});
    }
    
    welcome();
}
});

/*

DELETES AND EDITS

*/
client.on("messageUpdate", async (message, oldMessage, newMessage) => {
  if(message.author.bot) return;


  //console.log(oldMessage.content);
  //console.log(message.channel.id);
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

client.on("message", async message => {

    const logChannel = client.channels.find('id', '484087293464936458');
  
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
      commandFile.run(client, message, args, deletedMessage, talkedRecently, embeddedRecently, weatheredRecently,
      commandCount, coinsSet, roles, queue, sql, logChannel, settings, tossedSet);
    } catch (err) {
      logChannel.send("Invalid command: " + err)
      console.error("Invalid command: " + err);
      //message.channel.send("err: " + err)
    }
  }
  }
  

});

client.login(config.token);