const config = require("./../config.json");

exports.run = (client, message, args) => {

    if(!message.author.id === config.owner);
    console.log(">>> " + args.join(' '));

}

exports.conf = {
    DM: true,
    OwnerOnly: false
}