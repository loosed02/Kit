exports.run = (client, guild) => {
    const logChannel = client.channels.find('id', '484087293464936458');

    console.log(">>>Guild Joined: " + guild.name + " (" + guild.id + ")");
    logChannel.send("```>>>Guild Joined: " + guild.name + " (" + guild.id + ")```");
}
