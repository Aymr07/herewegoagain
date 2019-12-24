const {
    Command
} = require('klasa');


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
            usage: '<searchTerm:args>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }



    async run(msg, [searchTerm]) {
        console.log("working!?");
        var response = await this.client.funcs.animeFetch("anime", searchTerm, 1, 5);
        
        const display = await this.client.funcs.embed(msg, response)
        display.run(await msg.send("Loading..."))
        // console.log(response.Page.media[0]);

    }

};