const http = require('http')
const mineflayer = require('mineflayer')

// =========================
// Render Web Server
// =========================

const PORT = process.env.PORT || 10000

http.createServer((req, res) => {
    res.writeHead(200)
    res.end('AFK Bot is running!')
}).listen(PORT, '0.0.0.0', () => {
    console.log(`🌐 Web server running on port ${PORT}`)
})

// =========================
// Minecraft Bot
// =========================

let reconnectTimer = null

function createBot() {
    console.log('🔄 Connecting to Minecraft...')

    const bot = mineflayer.createBot({
        host: 'deadyfun.aternos.me',
        port: 51380,
        username: 'deadlyfun',
        version: false
    })

    // =========================
    // Bot Joined
    // =========================

    bot.once('spawn', () => {
        console.log('✅ BOT JOINED!')

        // Movement
        setInterval(() => {
            if (!bot.entity) return

            const moves = [
                'forward',
                'back',
                'left',
                'right'
            ]

            const move =
                moves[Math.floor(Math.random() * moves.length)]

            console.log(`🚶 Moving: ${move}`)

            // Move
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

    // =========================
    // Chat
    // =========================

    bot.on('chat', (username, message) => {
        console.log(`💬 ${username}: ${message}`)
    })

    // =========================
    // Error
    // =========================

    bot.on('error', (err) => {
        console.log(`❌ Error: ${err.message}`)
    })

    // =========================
    // Disconnect / Reconnect
    // =========================

    bot.on('end', () => {
        console.log('❌ Bot disconnected!')
        console.log('🔄 Reconnecting in 10 seconds...')

        if (reconnectTimer) {
            clearTimeout(reconnectTimer)
        }

        reconnectTimer = setTimeout(() => {
            reconnectTimer = null
            createBot()
        }, 10000)
    })
}

// Start bot
createBot()
