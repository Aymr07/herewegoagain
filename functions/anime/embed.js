const {
    Function
} = require("@kcp/functions");
const {
    RichDisplay
} = require("klasa")
const {
    MessageEmbed
} = require('discord.js');

/* Takes the response returned from the animeFetch and creates a RichDisplay out of it*/

module.exports = class extends Function {

    async run(msg, data) {

        var media = await data.Page.media;
        const display = new RichDisplay(new MessageEmbed())
        console.log(data.Page.media.length)
        for (let i = 0; i < media.length; i++) {

            console.log(media[i])

            display.addPage(
                new MessageEmbed()
                .setTitle(await media[i].title.romaji)
                .setColor(await media[i].coverImage.color)
                .addField('Description', await media[i].description.replace(/<[^>]*>/g, '')) // Long ass piece of shit...
                .setImage(await media[i].coverImage.large)
                .addField("Episodes", await media[i].episodes)
            )

        }

        return display
    }
}