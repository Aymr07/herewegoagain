const {
    Command
} = require('klasa');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "Character",
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 0,
            description: 'Searches for a character',
            quotedStringSupport: false,
            usage: '<searchTerm:args>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [searchTerm]) {




        var response = await this.client.funcs.animeFetch("character", searchTerm, 1, 5);

        // Retrieves the display RichDisplay from embed.js

        console.log(await response.Page.characters[0])





    }

};