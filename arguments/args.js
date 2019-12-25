const { Argument } = require('klasa');

module.exports = class extends Argument {

    run(arg) {
        const searchTerm = arg;
        return searchTerm;
    }

};