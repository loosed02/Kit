const fs = require('fs');
let settings = JSON.parse(fs.readFileSync("./JSON/settings.json", "utf8"));

exports.run = (client, member) => {
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
}