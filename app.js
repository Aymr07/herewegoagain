const {
    Client
} = require('klasa');
Client.use(require("@kcp/functions"));
var decrypt = "c0626ebeb5dddf0d5353988bc56a157d0ddd73533660869321e24bbb4dc2d5dc2c8e97cf3b5bd2d26efca0d94eefdbd76ce8b2a0ef71b0a9540b9734f09643fb"

var crypto = require('crypto');
var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
var mystr = mykey.update(decrypt, 'hex', 'utf8')
mystr += mykey.final('utf8');
mystr = mystr.replace("\"", "")
mystr = mystr.replace("\"", "")


console.log(mystr); //abc

new Client({
    fetchAllMembers: false,
    prefix: '-',
    commandEditing: true,
    typing: true,
    aliasFunctions: {
        returnMethod: "run",
        prefix: "funcs",
        enabled: true
    },
    readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(mystr);


