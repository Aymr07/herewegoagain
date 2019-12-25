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
        // Searches 5 most relevant results now. Whether the user can choose to alter it idk
        var response = await this.client.funcs.animeFetch("anime", searchTerm, 1, 5);

        // Retrieves the display RichDisplay from embed.js
        const display = await this.client.funcs.embed(response)
        display.run(await msg.send("Loading..."), {
            time: false,
            jump: false,
            stop: false,
            firstLast: false
        })

    }

};