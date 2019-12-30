// Function used to process the title and date to store them into a json

const {
    Function
} = require("@kcp/functions");
const fs = require('fs');
module.exports = class extends Function {

    async run(data) {
        

        var dates = {}

        for (let index = 0; index < data.length; index++) {

            var title = data[index].title.romaji;
            var date = data[index].nextAiringEpisode;

            // If the anime is finished, then date will be null (There is no nextAiringEpisode). Set it to a default value of 0.
            if (!date) {
                date = 0
            } else {
                date = date.airingAt;
            }
           
            dates[title] = date

            
        }


        // Perform magic and write it to the JSON. Btw this is my first time writing to a JSON uwu!
            let a = JSON.stringify(dates);
            fs.writeFileSync('/Users/Yousuf/Documents/herewegoagain/utils/animeSearchData.json', a);
    }

}