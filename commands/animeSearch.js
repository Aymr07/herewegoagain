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
            aliases: ['anime', 'character'],
            description: 'Get\'em anime rn boii',
            quotedStringSupport: false,
            usage: '<searchTerm:args>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [searchTerm]) {
       
        // Since this file can be called via anime or character, extracts what was used to call this file gg ez
        const searchType = msg.content.replace(msg.guildSettings.prefix, "").split(" ")[0]
        if (searchType === "animeSearch") {
            return msg.send("Please use either 'anime' or 'character' to search.")
        }
        
        
        var response = await this.client.funcs.animeFetch(searchType, searchTerm, 1, 5);

        // Retrieves the display RichDisplay from embed.js

        switch (searchType) {
            case "anime":
                var display = await this.client.funcs.embed(response)
                display.run(await msg.send("Loading..."), {
                time: false,
                jump: false,
                stop: false,
                firstLast: false
            })
                break;
            case "character":
                console.log(await response.Page.characters[0])

                break;
        
            default:
                break;
        }
        

    }

};