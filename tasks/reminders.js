const { Task } = require('klasa');

module.exports = class extends Task {

    async run({ channel, user, text }) {
        const _channel = this.client.channels.get(channel.id);
        console.log(channel)
        return _channel.send(`${user} A new episode of ${text} just released!`);
    }

};