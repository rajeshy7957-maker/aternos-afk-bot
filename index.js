const mineflayer = require('mineflayer');
const express = require('express');

// Express Web Server (Render ko Active Rakhne Ke Liye)
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('AFK Bot Online Hai!');
});

app.listen(port, () => {
    console.log('Web server running on port ' + port);
});

// Mineflayer Bot Logic
function createBot() {
    const bot = mineflayer.createBot({
        host: 'deadyfun.aternos.me',
        port: 51380,
        username: 'dedlyfun'
    });

    bot.on('spawn', () => {
        console.log('✅ Bot successful join ho gaya!');

        // Anti-AFK Jump + Movement
        setInterval(() => {
            const actions = ['forward', 'back', 'left', 'right'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];

            bot.setControlState(randomAction, true);
            bot.setControlState('jump', true);

            const yaw = Math.random() * Math.PI * 2;
            const pitch = (Math.random() - 0.5) * Math.PI;
            bot.look(yaw, pitch, true);

            setTimeout(() => {
                bot.clearControlStates();
            }, 1500);
        }, 4000);
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        console.log(`💬 [Chat] ${username}: ${message}`);
    });

    // Auto-Reconnect setup
    bot.on('end', () => {
        console.log('⚠️ Disconnected/Kicked! 10 sec me reconnect ho raha hu...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', err => console.log('❌ Error:', err));
}

createBot();
