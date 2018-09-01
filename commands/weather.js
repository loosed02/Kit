const weather = require('weather-js');
const Discord = require("discord.js");

exports.run = (client, message, args, deletedMessage, talkedRecently, embeddedRecently, weatheredRecently, commandCount, coinsSet, roles, queue, sql) => {

    if(!message.guild) return message.channel.send("This command is disabled in DMs");
	if (weatheredRecently.has(message.author.id)) {
		return message.reply("please wait 20 seconds before using that command again");
	} else {
	
	   // the user can type the command ... your command code goes here :)
	
	// Adds the user to the set so that they can't talk for a minute
	weatheredRecently.add(message.author.id);
	setTimeout(() => {
	  // Removes the user from the set after a minute
	  weatheredRecently.delete(message.author.id);
	}, 20000);
    }
    
    weather.find({search: args.join(' '), degreeType: 'F'}, function(err, result) {
        var time = new Date();
        console.log("Weather info generated for " + "\"" + args.join(' ') + "\"" + " -- " + time.getHours() + ":" + time.getMinutes());
        try{
            var infoVar = result;
            var info = result[0];
        var windSpeed = info.current.windspeed;
        var windSpeedRaw = windSpeed.replace("mph", "");

        var windDirection = info.current.winddisplay;
        var windDirectionRaw = windDirection.replace(windSpeedRaw, "");
        var windDirectionRawVar = windDirection.replace("mph", "");
        var windDirectionRaw = windDirectionRawVar.replace(windSpeedRaw, "");

        message.channel.send({embed: {
            title: "Weather information for " + info.location.name,
            "footer": {
                "icon_url": "https://kitk.us/bot/images/micro.png",
                "text": "Powered by MSN Weather"
              },
              "thumbnail": {
                "url": info.current.imageUrl
              },
            fields: [
              { name: "Weather Stats", value: "Temp: " + info.current.temperature + "°F • " + (Math.ceil(((info.current.temperature - 32) * (0.5556)) / 1) * 1) + "°C" + "\nFeels like: " + info.current.feelslike + "°F • " + (Math.ceil(((info.current.feelslike - 32) * (0.5556)) / 1) * 1) + "°C\n" + "Humidity: " + info.current.humidity + "%", inline: true},
              { name: "Wind", value: windSpeedRaw + "mph • " + (Math.ceil((windSpeedRaw) * 1.61) * 1) + " km/h\n" + "Direction: " + windDirectionRaw , inline: true}
            ]
          }
        });
            }
            catch(err){
                const embed = new Discord.RichEmbed()
                .setColor(0xF46242)
                //.setTimestamp()
                .setTitle("This search turned up blank")
                .setFooter(err)
                message.channel.send({embed});
              }
        //console.log(info);
      });


}

exports.conf = {
  DM: true,
  OwnerOnly: false
}