exports.run = (client, message, args) => {
    var response = Math.floor(Math.random()*35);
    var responseText = "u";
    while(response > 0){
        responseText = responseText + "lu";
        response = response - 1;
    }
    responseText = responseText + "lu";

    message.channel.send(responseText);

    }
    
    exports.conf = {
        DM: true,
        OwnerOnly: false
    }