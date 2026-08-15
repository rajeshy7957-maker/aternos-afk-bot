const http = require('http')
const mineflayer = require('mineflayer')

// Render ke liye web server
const PORT = process.env.PORT || 10000

http.createServer((req, res) => {
    res.writeHead(200)
    res.end('Minecraft AFK Bot is running!')
}).listen(PORT, () => {
    console.log(`🌐 Web server running on port ${PORT}`)
})

let reconnecting = false

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

        // Har 4 second movement
        setInterval(() => {
            if (!bot.entity) return

            const moves = ['forward', 'back', 'left', 'right']
            const move = moves[Math.floor(Math.random() * moves.length)]

            console.log('🚶 Moving:', move)

            bot.setControlState(move, true)

            setTimeout(() => {
                bot.setControlState(move, false)
            }, 2000)

            // Jump
            setTimeout(() => {
                bot.setControlState('jump', true)

                setTimeout(() => {
                    bot.setControlState('jump', false)
                }, 500)
            }, 500)

        }, 4000)
    })

    // Chat console me dikhana
    bot.on('chat', (username, message) => {
        console.log(`💬 ${username}: ${message}`)
    })

    // Error
    bot.on('error', (err) => {
        console.log('❌ Error:', err.message)
    })

    // Disconnect hone par reconnect
    bot.on('end', () => {
        if (reconnecting) return

        reconnecting = true

        console.log('❌ Bot disconnected!')
        console.log('🔄 Reconnecting in 10 seconds...')

        setTimeout(() => {
            reconnecting = false
            createBot()
        }, 10000)
    })
}

createBot()
