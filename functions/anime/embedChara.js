const {
    Function
} = require("@kcp/functions");
const {
    RichDisplay
} = require("klasa")
const {
    MessageEmbed
} = require('discord.js');
// const moment = require('moment')

/* Takes the response returned from the animeFetch and creates a RichDisplay out of it*/

module.exports = class extends Function {

    async run(data) {

        var characters = await data.Page.characters;
        const display = new RichDisplay(new MessageEmbed())
        console.log(characters)

        // Adds 5 pages to the RichDisplay with the necessary information
        for (let i = 0; i < characters.length; i++) {

            var anime = await characters[i];

            var desc;

            if (anime.description) {
                // description formating cos it sucks
                desc = await anime.description.split("<br>\n<br>").join("\n");
                desc = desc.split("<br><br>").join("\n");
                desc = desc.split("<br>").join("\n");

                // Removes some of the html tags in the description
                desc = desc.replace(/<[^>]*>/g, '')

                console.log(desc)

                // Cuts the desc to have less than 500 length
                if (desc.length > 500) {
                    console.log("Split the shit")
                    desc = await desc.substring(0, 500) + " ...";
                }
            } else {
                desc = "N/A"
            }

            if (desc.length > 500) {
                console.log("Split the shit")
                desc = await desc.substring(0, 500) + " ...";
            }



            display.addPage(
                new MessageEmbed()
                .setTitle(anime.name.full)
                .addField('Description', desc) // Long ass piece of shit...
                .addField("Appears in", anime.media.nodes[0].title.romaji)
                .setImage(anime.image.large)

            );


        }

        return display
    }
}