exports.run = (client, message, args) => {
    
    if(message.guild.id === "256926147827335170"){
        return;
    } else {
        message.channel.send("**" + message.author.username + "** has paid their respects.");
    }
}