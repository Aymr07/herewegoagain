const { Argument } = require('klasa');

module.exports = class extends Argument {

    run(arg, possible, message) {
        const searchTerm = arg;
        return searchTerm;
    }

};