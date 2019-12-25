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

        var media = await data.Page.media;
        const display = new RichDisplay(new MessageEmbed())

        // Adds 5 pages to the RichDisplay with the necessary information
        for (let i = 0; i < media.length; i++) {

            var anime = media[i];

            if (anime.format == "TV" || anime.format == "OVA" || anime.format == "MOVIE") {

                // If the anime does not have any episodes yet (in this case it is most likely unaired yet)
                var episodes;
                switch (anime.status) {
                    case "FINISHED":
                        episodes = anime.episodes;
                        break;
                    case "RELEASING":
                        episodes = anime.nextAiringEpisode.episode - 1 || "N/A";
                        break;
                    case "NOT_YET_RELEASED":
                        episodes = "TBA";
                        break;
                    case "CANCELLED":
                        episodes = "N/A";
                        break;
                    default:
                        throw new Error("Status not found?!?");
                }

                // Anime genres, and concatnate them using ','
                var genres = anime.genres.join(", ");

                var desc;
                if (anime.description) {
                    // description formating cos it sucks
                    desc = anime.description.split("<br>\n<br>").join("\n");
                    desc = desc.split("<br><br>").join("\n");
                    desc = desc.split("<br>").join("\n");

                    // Removes some of the html tags in the description
                    desc = desc.replace(/<[^>]*>/g, '')

                    // Cuts the desc to have less than 500 length
                    if (desc.length > 500) {
                        desc = desc.split(" ", 500).join(" ") + "...";
                    }
                } else {
                    desc = "N/A"
                }

                var status = anime.status.charAt(0).toUpperCase() + anime.status.slice(1).toLowerCase();

                if (status.includes("_"))
                    status = status.split("_").join(" ");

                display.addPage(
                    new MessageEmbed()
                    .setTitle(anime.title.romaji)
                    .setColor(anime.coverImage.color)
                    .addField('Description', desc) // Long ass piece of shit...
                    .setImage(anime.coverImage.large)
                    .setFooter(` - #${anime.id} powered by anilist.co`)
                    .addField("Episodes", episodes, true)
                    .addField("Score", anime.averageScore || "N/A", true)
                    .addField("Status", status, true)
                    .addField("Genres", genres, true)
                    
                );
                // var startDate = moment(`${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}`, "YYYY-MM-DD").format("MMMM YYYY");
                // var endDate = "On-Going";
            }
        }

        return display
    }
}