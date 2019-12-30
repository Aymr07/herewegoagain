const {
    Command
} = require('klasa');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "Anime",
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 0,
            description: 'Searches for an anime. Returns 5 pages',
            quotedStringSupport: false,
            usage: '<searchTerm:args>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [searchTerm]) {

        // Since this file can be called via anime or character, extracts what was used to call this file gg ez

        var response = await this.client.funcs.animeFetch("anime", searchTerm, 1, 5);

        // Retrieves the display RichDisplay from embed.js
        var display = await this.client.funcs.embed(response)
        display.run(await msg.send("Loading..."), {
            time: false,
            jump: false,
            stop: false,
            firstLast: false
        })
    }

};