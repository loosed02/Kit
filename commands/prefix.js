const fs = require('fs');
let prefixes = JSON.parse(fs.readFileSync("./JSON/prefixes.json", "utf8"));

const Discord = require("discord.js");

exports.run = (client, message, args) => {
       //Check for permissions
       
       try{
if(message.member.permissions.has('ADMINISTRATOR') || message.author.id === "378769654942007299"){

    if(args.length === 0){
       message.channel.send("Please enter a valid prefix");
        return;
        }

        prefixes[message.guild.id].prefix = args[0].replace("\"", "").replace("\"", "");
        const embed = new Discord.RichEmbed()
        .setTimestamp()
        .setTitle("Server prefix changed to: \"" + prefixes[message.guild.id].prefix + "\"")
        message.channel.send({embed});
    
        console.log('\x1b[36m%s\x1b[0m', "Server prefix for GUILD ID: " + message.guild.id);
        console.log('\x1b[36m%s\x1b[0m', "Changed to: " + args[0]);
        //Write to JSON
        fs.writeFile("./JSON/prefixes.json", JSON.stringify(prefixes, null, 2), (err) => {
            if (err) console.error(err)
          });
    
    } else {
        const embed = new Discord.RichEmbed()
        .setColor(0xF46242)
        .setTimestamp()
        .setTitle("You do not have permission to do this. (Admin required)")
        message.channel.send({embed});
    
         }
        }
        catch(err){
            console.log(err);
        }
}