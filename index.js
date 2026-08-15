const mineflayer = require('mineflayer')

function createBot() {
    console.log('Connecting...')

    const bot = mineflayer.createBot({
        host: 'deadyfun.aternos.me',
        port: 51380,
        username: 'deadlyfun',
        version: false
    })

    bot.once('spawn', () => {
        console.log('✅ BOT JOINED!')

        setInterval(() => {
            const moves = ['forward', 'back', 'left', 'right']
            const move = moves[Math.floor(Math.random() * moves.length)]

            bot.setControlState(move, true)

            setTimeout(() => {
                bot.setControlState(move, false)
            }, 2000)

            setTimeout(() => {
                bot.setControlState('jump', true)

                setTimeout(() => {
                    bot.setControlState('jump', false)
                }, 500)
            }, 500)
        }, 4000)
    })

    bot.on('error', err => {
        console.log('❌', err.message)
    })

    bot.on('end', () => {
        console.log('Disconnected — retrying in 10 seconds')
        setTimeout(createBot, 10000)
    })
}

createBot()
