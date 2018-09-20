//Code credit: Ratismal

const config = require("./../config.json");
const Eris = require('eris');
var bot = new Eris(config.token);

exports.run = (client, message, args) => {
async function sMode (msg, args){
    if (msg.member.permission.has("kickMembers") == true) {
    let time = parseInt(args[0]);
    args.shift();
        if (isNaN(time)) time = 0;
        let channel = msg.channel.id;
        time = Math.min(time, 120);
        
        const endpoint = Endpoints.CHANNEL(channel)
        try {
            await bot.requestHandler.request('PATCH', endpoint, true, {
                rate_limit_per_user: time,
                reason: args.join(" ")
            });

            let out = ':ok_hand: ';
            if (time === 0) out += 'Slowmode has been disabled.';
            else out += `Slowmode has been set to 1 message every **${time} seconds**.`;
            msg.channel.createMessage(out)
        } catch (err) {
           msg.channel.createMessage("I don't have perms!")
        }
    }
    else {
        msg.channel.createMessage("You need at least kickMembers to use this command!")
    }
}

sMode(message, args);

}