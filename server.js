// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// simple webpage for UptimeRobot
app.get('/', (req, res) => {
  res.send('✅ Minecraft AFK Bot is running 24/7!');
});

// health endpoint
app.get('/healthz', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`🌍 Web server running on port ${port}`);
});

// start the bot in the same process
require('./bot');
