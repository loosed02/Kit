exports.run = (client, message, args) => {
    function reverseString(str) {
	    var splitString = str.split("");
	    var reverseArray = splitString.reverse();
	    var joinArray = reverseArray.join("");
	    return joinArray;
    }

    
if(!args[0]){
	message.channel.send("Field is blank");
} else {
	message.channel.send(reverseString(args.join(' ')));
	  }
    
}