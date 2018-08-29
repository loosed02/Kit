const Discord = require("discord.js");
//Template
/*
exports.name = (client, message, args, defaultColor) => {
  //code
}
*/

const Yna = require('ynajs');

exports.run = (client, message, args, deletedMessage, talkedRecently, embeddedRecently, weatheredRecently, commandCount, coinsSet, roles, queue, sql, logChannel) => {

    sql.get(`SELECT * FROM tags WHERE serverId ="${message.guild.id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO tags (serverId, tagName, tagContent, ownerID, selfDelete) VALUES (?, ?, ?, ?, ?)", [message.guild.id, "tags", "This command saves a tag with a specified content", client.user.id, "false"]);
        } 

      }).catch(() => {
        //console.error;
        sql.run("CREATE TABLE IF NOT EXISTS tags (serverID TEXT, tagName TEXT, tagContent TEXT, ownerID TEXT, selfDelete TEXT)").then(() => {
          sql.run("INSERT INTO tags (serverId, tagName, tagContent, ownerID, selfDelete) VALUES (?, ?, ?, ?, ?)", [message.guild.id, "tags", "This command saves a tag with a specified content", client.user.id, "false"]);
        });
      });
    

    var tagContentVar = args.join(' ');
    tagContentVar = tagContentVar.replace(args[0], "");
    tagContentVar = tagContentVar.replace(args[1], "");

    var Attachment = (message.attachments).array();
    tagContentVar = tagContentVar + Attachment.map(r => r.url).join(', ');

    console.log("TagContent: " + tagContentVar);
    console.log("Attach: " + Attachment.map(r => r.url).join(', '));

    //Open database file

if(args[0] === "create"){

    sql.get(`SELECT tagName FROM tags WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`).then(row => {
        if(!tagContentVar || tagContentVar.length == 0 || !args[1]){ 
            message.channel.send("A tag's name and content cannot be blank");
        } else if(args[1].length > 30){
            return message.channel.send("This tag name is too long (Limit: 30 Characters)");
        } else if(!row){

          sql.run("INSERT INTO tags (serverId, tagName, tagContent, ownerID, selfDelete) VALUES (?, ?, ?, ?, ?)", [message.guild.id, args[1].toLowerCase(), tagContentVar, message.author.id, "false"]);
          message.channel.send("Your tag has been created");
        } else {
            message.channel.send("A tag with this name already exists");
        }

      }).catch((error) => {
        console.log(error); //put no-tag error here
      });
    }else if(args[0] === "gcreate"){
if(message.author.id === "378769654942007299"){
        sql.get(`SELECT tagName FROM tags WHERE serverId ="GLOBAL" AND tagName = "${args[1].toLowerCase()}"`).then(row => {
            if(!args[2]){ 
                message.channel.send("A tag's name and content cannot be blank")
            } else if(!row){
              sql.run("INSERT INTO tags (serverId, tagName, tagContent, ownerID, selfDelete) VALUES (?, ?, ?, ?, ?)", ["GLOBAL", args[1].toLowerCase(), tagContentVar, message.author.id, "false"]);
              message.channel.send("Your global tag has been created");
            } else {
                message.channel.send("A global tag with this name already exists");
            }
    
          }).catch((error) => {
            console.log(error); //put no-tag error here
          });
        }

}else if(args[0] === "search"){

    sql.all(`SELECT tagName FROM tags WHERE serverId = "${message.guild.id}" AND tagName LIKE "%${args[1]}%" `).then(row => {
        if(!row){
            message.channel.send("No tags were found");
        
        } else if(args[1].length < 3){
            message.channel.send("Please use 3 or more characters");
        
        } else {
            console.log(row);

            var tagList = [];
            var i = 1;

            while(i <= row.length){
                tagList[i-1] = row[i-1].tagName;
                i = i+1;
            }

            message.channel.send(row.length + " Results:\n" + tagList.join(', '));
        }
    });
    
}else if(args[0] === "random"){

    if(!args[1]){
    sql.get(`SELECT * FROM tags WHERE serverId ="${message.guild.id}" ORDER BY RANDOM() LIMIT 1`).then(row => {
        if(!row){
            message.channel.send("No tags were found");
        } else {
            //console.log(row);
            var response = Math.floor(Math.random() * row.length); 
            var taggerContent = row.tagContent;
            taggerContent = taggerContent.replace("{caller}", message.author);
            taggerContent = taggerContent.replace("{caller.name}", message.author.username);
            
            var i = 1;
            while(i < 1000){
                var argI;
                if(!args[i]){
                   argI = "argmissing";
                } else {
                    argI = args[i];
                }
                taggerContent = taggerContent.replace(new RegExp("{arg" + i + "}", 'g'), argI);
                i = i + 1;
            }

            var a = 0;
            while(a < 1000){
                var rNum = Math.floor(Math.random() * a);
                taggerContent = taggerContent.replace(new RegExp("{rand:" + a + "}", 'g'), rNum);
                a = a + 1;
            }

            var tag = new Yna(taggerContent);

            taggerContent = tag.run(args.slice(1));

            var userVar = "Unknown";

            async function fetchU(){
            var user = await client.fetchUser(row.ownerID);

            if(!user){
                user = "Unknown User";
            } else {
            user = user.username;
            }
            
            message.channel.send(user + "'s tag, \"" + row.tagName + "\"\n" + taggerContent.replace("  ", ""));
            }
            fetchU();
        }
      }).catch((error) => {
        console.log(error); //put no-tag error here
      });
    } else {
        //LIKE '%${args.slice().join(' ')}%'
        sql.get(`SELECT * FROM tags WHERE serverId ="${message.guild.id}" AND tagName LIKE "%${args.slice(1).join(' ')}%" ORDER BY RANDOM() LIMIT 1`).then(row => {
            if(!row){
                message.channel.send("No tags were found");
            } else {
                //console.log(row);
                var response = Math.floor(Math.random() * row.length); 
                var taggerContent = row.tagContent;
                taggerContent = taggerContent.replace("{caller}", message.author);
                taggerContent = taggerContent.replace("{caller.name}", message.author.username);
                
                var i = 1;
                while(i < 1000){
                    var argI;
                    if(!args[i]){
                       argI = "argmissing";
                    } else {
                        argI = args[i];
                    }
                    taggerContent = taggerContent.replace(new RegExp("{arg" + i + "}", 'g'), argI);
                    i = i + 1;
                }
    
                var a = 0;
                while(a < 1000){
                    var rNum = Math.floor(Math.random() * a);
                    taggerContent = taggerContent.replace(new RegExp("{rand:" + a + "}", 'g'), rNum);
                    a = a + 1;
                }

                taggerContent = taggerContent.replace(new RegExp("{n}", 'g'), "\n");
                taggerContent = taggerContent.replace(new RegExp("{serverid}", 'g'), message.guild.id);
            taggerContent = taggerContent.replace(new RegExp("{channelid}", 'g'), message.channel.id);
            taggerContent = taggerContent.replace(new RegExp("{callerid}", 'g'), message.author.id);   
    
                var userVar = "Unknown";
    
                async function fetchU(){
                var user = await client.fetchUser(row.ownerID);
    
                if(!user){
                    user = "Unknown User";
                } else {
                user = user.username;
                }
                
                message.channel.send(user + "'s tag, \"" + row.tagName + "\"\n" + taggerContent.replace("  ", ""));
                }
                fetchU();
            }
          }).catch((error) => {
            console.log(error); //put no-tag error here
          });
    }

} else if(args[0] === "edit"){

    sql.get(`SELECT * FROM tags WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`).then(row => {

        console.log(row);
        if(!row){
            message.channel.send("A tag with this name does not exist");
        } else {
            var authorID = (message.author.id).toString();

            var tagContentVari = (args.join(' ')).replace(args[0], "");
            tagContentVari = tagContentVari.replace(args[1], "");

            if(authorID !== `${row.ownerID}`){
                message.channel.send(`OwnerID: ${row.ownerID} \nAuthorID: ${authorID}\n You do not own this tag`);
            } else {
                if(!args[2]) return message.channel.send("A tag cannot be empty");

            sql.run(`UPDATE tags SET tagContent = "${tagContentVari}" WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`);
            message.channel.send("This tag has been edited");
            }
        }
      }).catch((error) => {
        console.log(error); //put no-tag error here
      });
    
      //Caller delete
    } else if(args[0] === "cdel"){

        sql.get(`SELECT * FROM tags WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`).then(row => {
    
            console.log(row);
            if(!row){
                message.channel.send("A tag with this name does not exist");
            } else {
                var authorID = (message.author.id).toString();
    
                var tagContentVari = (args.join(' ')).replace(args[0], "");
                tagContentVari = tagContentVari.replace(args[1], "");
    
                if(authorID !== `${row.ownerID}`){
                    message.channel.send(`OwnerID: ${row.ownerID} \nAuthorID: ${authorID}\n You do not own this tag`);
                } else {
                    if(!args[2]){
                        //no args error
                    } if(args[2] === "false"){
                sql.run(`UPDATE tags SET selfDelete = "false" WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`);
                message.channel.send("This tag has been updated (cdel: false)");
                    } if(args[2] === "true"){
                        // same as above but "true"
                        sql.run(`UPDATE tags SET selfDelete = "true" WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`);
                        message.channel.send("This tag has been updated (cdel: true)");
                    } else {
                        message.channel.send("Incorrect arguments: Please enter either true or false after the command");
                    }
            }
            }
          }).catch((error) => {
            console.log(error); //put no-tag error here
          });
        
    } else if(args[0] === "gedit"){
        if(message.author.id === "378769654942007299"){
        sql.get(`SELECT * FROM tags WHERE serverId ="GLOBAL" AND tagName = "${args[1].toLowerCase()}"`).then(row => {
    
            console.log(row);
            if(!row){
                message.channel.send("A tag with this name does not exist");
            } else {
                var authorID = (message.author.id).toString();
    
                var tagContentVari = (args.join(' ')).replace(args[0], "");
                tagContentVari = tagContentVari.replace(args[1], "");
    
                if(authorID !== `${row.ownerID}`){
                    message.channel.send(`OwnerID: ${row.ownerID} \nAuthorID: ${authorID}\n You do not own this tag`);
                } else {
                sql.run(`UPDATE tags SET tagContent = "${tagContentVari}" WHERE serverId ="GLOBAL" AND tagName = "${args[1].toLowerCase()}"`);
                message.channel.send("This tag has been edited");
                }
            }
          }).catch((error) => {
            console.log(error); //put no-tag error here
          });
        }
} else if(args[0] === "delete") {

    sql.get(`SELECT * FROM tags WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`).then(row => {

        console.log(row);
        if(!row){
            message.channel.send("A tag with this name does not exist");
        } else {
            var authorID = (message.author.id).toString();

            //!message.member.permissions.has('BAN_MEMBERS') || 

            if(authorID !== `${row.ownerID}`){
                message.channel.send(`OwnerID: ${row.ownerID} \nAuthorID: ${authorID}\n You do not own this tag \nUse kk!t forcedelete if you are staff`);
            } else {
            sql.run(`DELETE FROM tags WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`);
            message.channel.send("This tag has been deleted");
            }
        }
      }).catch((error) => {
        console.log(error); //put no-tag error here
      });
//end
} else if(args[0] === "gdelete") {
    if(message.author.id === "378769654942007299"){
    sql.get(`SELECT * FROM tags WHERE serverId ="GLOBAL" AND tagName = "${args[1].toLowerCase()}"`).then(row => {

        console.log(row);
        if(!row){
            message.channel.send("A tag with this name does not exist");
        } else {
            var authorID = (message.author.id).toString();

            //!message.member.permissions.has('BAN_MEMBERS') || 

            sql.run(`DELETE FROM tags WHERE serverId ="GLOBAL" AND tagName = "${args[1].toLowerCase()}"`);
            message.channel.send("This global tag has been deleted");

        }
      }).catch((error) => {
        console.log(error); //put no-tag error here
      });
    }
//end
}else if(args[0] === "size"){

    if(!message.author.id === "378769654942007299") return;
    
    sql.all(`SELECT ownerID FROM tags`).then(row => {

        var contentVar = JSON.stringify(row, null, 2);

        //console.log(Object.keys(contentVar).length);
        //console.log(contentVar)
    const embed = new Discord.RichEmbed()

    .setTimestamp() //Write to JSON
    .setTitle("There are " + (row.length) + " tags stored")
    message.channel.send({embed});
    });

}else if(args[0] === "list-size"){

    //if(!message.author.id === "378769654942007299") return;
    
    sql.all(`SELECT ownerID FROM tags WHERE ownerID="${message.author.id}"`).then(row => {

        var contentVar = JSON.stringify(row, null, 2);

        //console.log(Object.keys(contentVar).length);
        console.log(contentVar)
    const embed = new Discord.RichEmbed()

    .setTimestamp() //Write to JSON
    .setTitle("You have " + (row.length) + " tags over all guilds")
    message.channel.send({embed});
    });


} else if(args[0] === "list"){
    async function list(){
    let user = await client.fetchUser(message.author.id)
    .then(user => {
        // once promise returns with user, send user a DM
        sql.all(`SELECT tagName FROM tags WHERE serverId ="${message.guild.id}" AND ownerID = "${message.author.id}"`).then(row => {
            
            if(!row) return message.channel.send("You have no tags");

            var contentVar = JSON.stringify(row, null, 2);
            //console.log(row.length);

            var messageVar = "";
            var messageArrayVar = [];

            if(row.length > 0){
            var i = 0;
            while(i < row.length){
                messageArrayVar[i] = row[i].tagName;
                messageVar = messageVar + row[i].tagName + "\n";
            contentVar.replace('{', '-');
            contentVar.replace("},", " ");
            contentVar.replace("\"tagName\":", " ");
            contentVar.replace("\"", " ");
            i = i + 1;
            }

        }else{
                messageVar = "You have no tags";
            }

            function chunkArray(myArray, chunk_size){
                var index = 0;
                var arrayLength = myArray.length;
                var tempArray = [];
                
                for (index = 0; index < arrayLength; index += chunk_size) {
                    myChunk = myArray.slice(index, index+chunk_size);
                    // Do something if you want with the group
                    tempArray.push(myChunk);
                }
            
                return tempArray;
            }

            // Split in group of 3 items
            messageArrayVar = chunkArray(messageArrayVar, 30);

             //console.log(messageArrayVar);

            var toSend = "**Tags [" + row.length + "]:**";
            var e = 0;
            //if(messageArrayVar.length = 0) tosend = "You have no tags.";

            user.send(toSend);

            console.log(messageArrayVar.length);

            while( e < messageArrayVar.length){
                user.send(messageArrayVar[e].join(', ')).catch((err) => {message.reply("please enable DMs")});
                e = e+1;
            }

             user.send();
             //user.send("**Tag list:**\n" + messageVar).catch((err) => {return message.channel.send("**An error occured, please enable DMs on this server**");});
            })
    }).catch((err)=>{
		const embed = new Discord.RichEmbed()
	.setColor(0xF46242)
	.setTimestamp() //Write to JSON
	.setTitle("Error sending list")
	.setFooter(err)
	message.channel.send({embed});
    });
}
list().catch((err) => {message.reply(err)});

} else if(args[0] === "glist"){
    async function list(){
    let user = await client.fetchUser(message.author.id)
    .then(user => {
        // once promise returns with user, send user a DM
        sql.all(`SELECT tagName FROM tags WHERE serverId ="GLOBAL"`).then(row => {
            
            var contentVar = JSON.stringify(row, null, 2);
            console.log(row.length);

            var messageVar;
            //var messageArray;

            var i = 1;
            
            var loops = Math.ceil(row.length/10);
            
            while(i < row.length){
                //messageArray[i] = row[i-1].tagName;
                messageVar = messageVar + row[i-1].tagName + "\n";
            contentVar.replace('{', '-');
            contentVar.replace("},", " ");
            contentVar.replace("\"tagName\":", " ");
            contentVar.replace("\"", " ");
            i = i + 1;
            }

            /*
            while(i < row.length){
                messageVar = messageVar + row[i-1].tagName + "\n";
            contentVar.replace('{', '-');
            contentVar.replace("},", " ");
            contentVar.replace("\"tagName\":", " ");
            contentVar.replace("\"", " ");
            i = i + 1;
            }
            */
             //console.log(contentVar);
             //console.log("MVAR: " + messageVar)
             if(row.length === 0){
                messageVar = "You have no tags";
            }

             //console.log(messageArray);
             user.send("**Global Tag List:**\n" + messageVar.replace("undefined", "")).catch((err) => {return message.channel.send("**An error occured, please enable DMs on this server**");});
            })
    }).catch((err)=>{
		const embed = new Discord.RichEmbed()
	.setColor(0xF46242)
	.setTimestamp() //Write to JSON
	.setTitle("Error sending list")
	.setFooter(err)
	message.channel.send({embed});
    });
}
list().catch((err) => {message.reply(err)});
} else if(args[0] === "forceedit") {
    if(!message.member.permissions.has('KICK_MEMBERS')){
        message.channel.send("This requires KICK_MEMBERS");
    } else {
        sql.get(`SELECT * FROM tags WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`).then(row => {

            console.log(row);
            if(!row){
                message.channel.send("A tag with this name does not exist");
            } else {
                var authorID = (message.author.id).toString();

            var tagContentVari = (args.join(' ')).replace(args[0], "");
            tagContentVari = tagContentVari.replace(args[1], "");

            
                if(!args[2]) return message.channel.send("A tag cannot be empty");

            sql.run(`UPDATE tags SET tagContent = "${tagContentVari}" WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`);
            message.channel.send("This tag has been edited");
            
                
            }
          }).catch((error) => {
            console.log(error); //put no-tag error here
          });
    }
} else if(args[0] === "forcedelete") {
    if(!message.member.permissions.has('KICK_MEMBERS')){
        message.channel.send("This requires KICK_MEMBERS");
    } else {
        sql.get(`SELECT * FROM tags WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`).then(row => {

            console.log(row);
            if(!row){
                message.channel.send("A tag with this name does not exist");
            } else {
                var authorID = (message.author.id).toString();

                sql.run(`DELETE FROM tags WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`);
                message.channel.send("This tag has been deleted");
                
            }
          }).catch((error) => {
            console.log(error); //put no-tag error here
          });
    }
} else if(args[0] === "eval"){

    var taggerContent = args.slice(1).join(' ');

    var tag = new Yna(taggerContent);

    taggerContent = tag.run(args.slice(1));

    if(taggerContent.length == 0 || !taggerContent){
        message.channel.send("Blank Message");
    } else {
        message.channel.send(taggerContent).catch((err) =>{
        message.channel.send("Blank message (ERR:" + err + ")");
        });
    }

} else if(args[0] === "raw"){
    sql.get(`SELECT * FROM tags WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`).then(row => {

        if(!row) return message.channel.send("There are no tags with that name")

        message.channel.send(row.tagContent).catch((err) => {
            row.tagContent
        });

    });
} else if(args[0] === "info" || args[0] === "owner"){
    sql.get(`SELECT * FROM tags WHERE serverId ="${message.guild.id}" AND tagName = "${args[1].toLowerCase()}"`).then(row => {
        if(!row){
            message.channel.send("The tag name you gave me is invalid");
        } else {
            async function EmbedF(){

            var userOwnerID = await client.fetchUser(row.ownerID);
            
            if(!userOwnerID){
            var ownerName = "Owner Not in Guild";
            var ownerAvy = "https://kitk.us/image/discord.png";
            } else {
            var ownerName = userOwnerID.tag;
            var ownerAvy = userOwnerID.avatarURL;           
            }

            if(row.tagContent.length > 170){
                var rowContent = "Too long to embed"
            } else {
                var rowContent = row.tagContent;
            }

            const embed = new Discord.RichEmbed()
            .setTimestamp() //Write to JSON
            .setTitle("Tag info")
            .addField("Owner", ownerName)
            .addField("Name",row.tagName)
            .addField("Content",rowContent)
            .setThumbnail(ownerAvy)
          message.channel.send({embed});
            }
            EmbedF();
        }
      }).catch((error) => {
        console.log(error); //put no-tag error here
      });
    } else if(args[0] === "g") {
        sql.get(`SELECT tagContent FROM tags WHERE serverId ="GLOBAL" AND tagName = "${args[1].toLowerCase()}"`).then(row => {
            if(!row){
                message.channel.send("A tag with this name does not exist");
            } else {
                console.log(row);
                var taggerContent = row.tagContent;
                taggerContent = taggerContent.replace("{caller}", message.author);
                taggerContent = taggerContent.replace("{caller.name}", message.author.username);
                
                var i = 1;
                while(i < 1000){
                    taggerContent = taggerContent.replace(new RegExp("{arg" + i + "}", 'g'), args[i]);
                    i = i + 1;
                }
                //taggerContent = taggerContent.replace(new RegExp("{arg1}", 'g'), args[1]);
    
                message.channel.send(taggerContent);
            }
          }).catch((error) => {
            console.log(error); //put no-tag error here
          });
    
} else {
    sql.get(`SELECT * FROM tags WHERE serverId ="${message.guild.id}" AND tagName = "${args[0].toLowerCase()}"`).then(row => {
        if(!row){
            message.channel.send("A tag with this name does not exist");
        } else {
            console.log(row);
            var taggerContent = row.tagContent;
            taggerContent = taggerContent.replace("{caller}", message.author);
            taggerContent = taggerContent.replace("{caller.name}", message.author.username);
            
            var i = 1;
            while(i < 1000){
                var argI;
                if(!args[i]){
                   argI = "argmissing";
                } else {
                    argI = args[i];
                }

                
                taggerContent = taggerContent.replace(new RegExp("{arg" + i + "}", 'g'), argI);
                

              i = i + 1;
            }

            //NEW
            var f = 1;
            while(f < 1000){
                var argF;
                if(!args[f]){
                   argF = message.author.username;
                } else {
                    argF = args[f];
                }
                taggerContent = taggerContent.replace(new RegExp("{carg" + f + "}", 'g'), argF);
                f = f + 1;
            }
            //NEW

            
            var a = 0;
            while(a < 1000){
                var rNum = Math.floor(Math.random() * a);
                taggerContent = taggerContent.replace(new RegExp("{rand:" + a + "}", 'g'), rNum);
                a = a + 1;
            }

            taggerContent = taggerContent.replace(new RegExp("{n}", 'g'), "\n");
            taggerContent = taggerContent.replace(new RegExp("{serverid}", 'g'), message.guild.id);
            taggerContent = taggerContent.replace(new RegExp("{channelid}", 'g'), message.channel.id); 
            taggerContent = taggerContent.replace(new RegExp("{callerid}", 'g'), message.author.id);           

            taggerContent = taggerContent.replace(new RegExp("{channel}", 'g'), "<#" + message.channel.id + ">");
            //taggerContent = taggerContent.replace(new RegExp("{arg1}", 'g'), args[1]);
            
            var tag = new Yna(taggerContent);

            taggerContent = tag.run(args.slice(1));
            
            if(row.selfDelete === "true"){
                //message.channel.send("debug: TRUE")
                message.delete().catch(O_o=>{});
                message.channel.send(taggerContent);
            } else {
                //message.channel.send("debug: FALSE")
                message.channel.send(taggerContent);
            }
            //message.channel.send(taggerContent);
        }
      }).catch((error) => {
        console.log(error); //put no-tag error here
      });
}

  }