const {
    Function
} = require("@kcp/functions");


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
                // console.log(collected.map(x => {return x.users}))
                // console.log(message.embeds)

              
                
                // here's where the handling should be done
                if (collected.size > 0) {

                    



                    message.send(`${user} you have turned on notifications for ${message.embeds[0].title}`)
                    message.reactions.removeAll()

                    this.client.schedule.create('reminders', '* * * * *', {
                        data: {
                            // This is the metadata. In one minute after the creation of this scheduled
                            // task, Schedule will call your new task with this object.
                            user: user,
                            text: `${message.embeds[0].title}`,
                            channel: channel
                        },
                        catchUp: true
                        // This task will try to run again (catch up) if the bot was off when it was meant to fire
                    });
                }
                
            })
            .catch(console.error);
    }
}