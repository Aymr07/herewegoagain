const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

const images = [
    'https://i.imgur.com/gh3vYgj.jpg',
    'https://i.imgur.com/vBV81m4.jpg',
    'https://i.imgur.com/92hAsqe.jpg'
];

module.exports = class extends Command {

    async run(message) {
        

        for (let i = 0; i < images.length; i++) {
            display.addPage(template => template.setImage(images[i]));
        }

        return display.run();
    }

};