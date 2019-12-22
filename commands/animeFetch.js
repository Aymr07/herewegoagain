const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "animeFetch",
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 0,
            aliases: ['anime', 'search'],
            description: 'Get\'em anime rn boii',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        // This is where you place the code you want to run for your command
    }

};