
exports.run = (client, message, args, deletedMessage, talkedRecently, embeddedRecently, weatheredRecently, commandCount, coinsSet, roles, queue, sql, logChannel, settings, tossedSet, replaceector) => {


    sql.get(`SELECT * FROM ai`).then(row => {

    const MarkovChain = require('markovchain')
, fs = require('fs')
, quotes = new MarkovChain(
row.aiData
)

    message.channel.send("`"+ quotes.end(15).process() + "`")
    
});
    }
    
    exports.conf = {
        DM: true,
        OwnerOnly: false
    }