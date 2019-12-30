const {
    Client
} = require('klasa');
Client.use(require("@kcp/functions"));

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
}).login("NTYxOTc4NDUyNDkyODEyMzIw.Xf0v1A.3JDhbFl9F9vMmqmljOgwB_zPjhk");


