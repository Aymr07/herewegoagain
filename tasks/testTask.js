const { Task } = require('klasa');

module.exports = class extends Task {

    constructor(...args) {
        super(...args, { name: 'test', enabled: true });
    }

    async run({ channel, user}) {
        console.log("starts")
        const _channel = this.client.channels.get(channel);
        return _channel.send(`<@${user}> suck on my cock`);
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};