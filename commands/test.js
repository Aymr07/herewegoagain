const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'yourCommandName',
            enabled: true,
            runIn: ['text', 'dm'],
            aliases: ['t'],
            description: '',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg) {
        const fs = require('fs');

        var student = {}

        for (let index = 0; index < 5; index++) {
           
            student[index] = "Hello World!"
            
            
        }

        let data = JSON.stringify(student);
            fs.writeFileSync('/Users/Yousuf/Documents/herewegoagain/utils/animeSearchData.json', data);

        
    }

};