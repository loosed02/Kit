const AFHConvert = require('ascii-fullwidth-halfwidth-convert');
const converter = new AFHConvert();

exports.run = (client, message, args) => {
if(!args[0]){
    message.channel.send("Field is blank");
}else if(args[0].toLowerCase() === "dong" && !args[1]){
    message.channel.send("https://i.imgur.com/65ldTm4.png");
} else {
var messageStr = args.join(' ');
message.channel.send(converter.toFullWidth(messageStr));
      }
    }