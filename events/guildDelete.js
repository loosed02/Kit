const fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

exports.run = (client, guild) => {
    const logChannel = client.channels.find('id', config.logChannel);
    console.log(">>>Guild Left: " + guild.name + " (" + guild.id + ")");
    logChannel.send("```>>>Guild Left: " + guild.name + " (" + guild.id + ")```");
}