const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

const images = [
    'https://i.imgur.com/gh3vYgj.jpg',
    'https://i.imgur.com/vBV81m4.jpg',
    'https://i.imgur.com/92hAsqe.jpg'
];

module.exports = class extends Command {

    async run(message) {
        
        this.client.schedule.create('test', Date.now() + (1), {
            data: {
                // This is the metadata. In one minute after the creation of this scheduled
                // task, Schedule will call your new task with this object.
                user: message.author.id,
                text: 'This is a reminder',
                channel: message.channel.id
            },
            catchUp: true
            // This task will try to run again (catch up) if the bot was off when it was meant to fire
        });
    }
};