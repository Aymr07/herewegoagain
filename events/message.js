const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'messageEvent',
            enabled: true,
            event: 'message',
            once: false
        });
    }

    run(msg) {
        console.log(msg.author.username, "sent this :", msg.content)
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};