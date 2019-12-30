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
                message.send(`${user} you have turned on notification for ${message.embeds[0].title}`)
                message.reactions.removeAll()
            })
            .catch(console.error);
    }
}