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

    async run(data) {

        var media = await data.Page.media;
        const display = new RichDisplay(new MessageEmbed())

        // Adds 5 pages to the RichDisplay with the necessary information
        for (let i = 0; i < media.length; i++) {

            // If the anime does not have any episodes yet (in this case it is most likely unaired yet)
            if (!media[i].episodes) {
                var episodes = "TBA"
            } else {
                episodes = media[i].episodes
            }

            // Removes some of the html tags in the description
            let desc = media[i].description.replace(/<[^>]*>/g, '')

            // Since embeds can only accept up to 1024 characters. Some animes have long ass descriptions
            if (desc.length > 1024) {
                desc = desc.slice(0, 1020) + "..."
            }

            display.addPage(
                new MessageEmbed()
                .setTitle(media[i].title.romaji)
                .setColor(media[i].coverImage.color)
                .addField('Description', desc) // Long ass piece of shit...
                .setImage(media[i].coverImage.large)
                .addField("Episodes", episodes, true)
                .addField("Score", media[i].averageScore, true)
            )

        }

        return display
    }
}