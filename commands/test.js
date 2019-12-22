const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Get the name of an searchTerm.',
            usage: '<searchTerm:args>'
        });
    }

    run(msg, [searchTerm]) {
        console.log(typeof searchTerm)
        return msg.send(`The name of the searchTerm ${searchTerm} is`);
    }

};