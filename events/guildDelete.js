const logChannel = client.channels.find('id', '479712042660528128');
exports.run = (client, guild) => {
    console.log(">>>Guild Left: " + guild.name + " (" + guild.id + ")");
    logChannel.send("```>>>Guild Left: " + guild.name + " (" + guild.id + ")```");
}