const http = require('http')
const mineflayer = require('mineflayer')

const PORT = process.env.PORT || 10000

// Render ko web service alive dikhane ke liye
http.createServer((req, res) => {
    res.writeHead(200)
    res.end('Minecraft AFK Bot is running!')
}).listen(PORT, () => {
    console.log(`🌐 Web server running on port ${PORT}`)
})

function createBot() {
    console.log('🔄 Connecting to Minecraft...')

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

            console.log('➡️ Moving:', move)

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

    bot.on('chat', (username, message) => {
        console.log(`${username}: ${message}`)
    })

    bot.on('error', (err) => {
        console.log('❌ Error:', err.message)
    })

    bot.on('end', () => {
        console.log('❌ Bot disconnected!')
        console.log('🔄 Reconnecting in 10 seconds...')

        setTimeout(() => {
            createBot()
        }, 10000)
    })
}

createBot()
