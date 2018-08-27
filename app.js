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


client.login(config.token);