const {
    Function
} = require("@kcp/functions");
const fs = require('fs');


module.exports = class extends Function {

    /**
     * 
     * @param {*} channel channel property
     * @param {*} message message property
     * @param {*} user user property
     */
    async run(channel, message, user) {
        message.react('🔔'); //reacts with the bell emote

        // filter for reactions as well as handling it when done
        const filter = (reaction, usr) => reaction.emoji.name === '🔔' && usr.id === user.id;
        message.awaitReactions(filter, {
                time: 60000,
                max: 1,
            })
            .then(collected => {

                // here's where the handling should be done
                if (collected.size > 0) {

                    // Reads the previously written JSON file

                    let rawdata = fs.readFileSync('utils/animeSearchData.json');
                    let student = JSON.parse(rawdata);

                    // Converts the Epoch date format into a Cron format to be used in the reminders.

                    var airingDate = student[message.embeds[0].title];
                    if (airingDate === 0) {

                        message.send("This anime has no future episodes.")

                    }
                     else {
                        var alert = new Date(airingDate * 1000);
                        console.log(alert)
                        var cronThingy = alert.getUTCMinutes() + ' ' + alert.getUTCHours() + ' *' + ' * ' + alert.getUTCDay()
                        console.log(cronThingy);

                        // Notifies the user about the notifications, removes all reactions as well.

                        message.send(`${user} you have turned on notifications for ${message.embeds[0].title}`)
                        message.reactions.removeAll()

                        // Creates the reminder with the previously created Cron time format.

                        this.client.schedule.create('reminders', cronThingy, {
                            data: {
                                user: user,
                                text: `${message.embeds[0].title}`,
                                channel: message.channel
                            },
                            catchUp: true
                        });
                    }
                }

            })
            .catch(console.error);

    }
}