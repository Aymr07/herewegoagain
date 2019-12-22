const {
    Client
} = require('klasa');
const config = require("./config.json");
Client.use(require("@kcp/functions"));

new Client({
    fetchAllMembers: false,
    prefix: '!',
    commandEditing: true,
    typing: true,
    aliasFunctions: {
        returnMethod: "run",
        prefix: "funcs",
        enabled: true
    },
    readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(config.main.token);