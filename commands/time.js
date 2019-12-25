const { Command } = require('klasa');


module.exports = class extends Command {

    async run(msg) {
        const Timer = require('tiny-timer')
        const timer = new Timer({
            interval : 3000
        })
        timer.start(10000) 
        timer.on('done', () => {
            msg.send("TIMER DONE NIGGA")
        })
        timer.on('tick', () => {
            msg.send("Hello world!")
        })
    
        
    }

};