const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "animeSearch",
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 0,
            aliases: ['anime', 'search'],
            description: 'Get\'em anime rn boii',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        console.log("working!?");
        var response = await this.client.funcs.animeFetch("anime", "one-punch man", 1, 1);
        console.log(response.Page.media[0].title);
        msg.send(JSON.stringify(response.Page.media[0].title));
    }

};