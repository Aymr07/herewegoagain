const {Command} = require("klasa");

module.exports = class extends Command {
    async run(msg) {
        this.client.schedule.create('reminders', '*/2 * * * *', {
            data: {
                user: msg.author.id,
                text: 'This is a reminder',
                channel: msg.channel.id
            },
            catchUp: true
        });
    }
}