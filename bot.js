// bot.js
const mineflayer = require('mineflayer');

const HOST = process.env.MC_HOST || 'minecraftsinhto-MQmj.aternos.me'; // thay nếu cần
const PORT = parseInt(process.env.MC_PORT || '19484', 10);
const BOT_NAME = process.env.BOT_NAME || 'AFK_Bot_01';
const AUTH = process.env.MC_AUTH || 'offline'; // 'mojang' or 'offline'
const CHAT_MS = parseInt(process.env.CHAT_INTERVAL_MS || (5 * 60 * 1000), 10); // 5 phút
const JUMP_MS = parseInt(process.env.JUMP_INTERVAL_MS || (60 * 1000), 10); // 60s

function createBot(){
  console.log('Tạo bot mới ->', BOT_NAME, HOST+':'+PORT, 'auth=' + AUTH);
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: BOT_NAME,
    auth: AUTH
    // nếu muốn cố định version, thêm: version: '1.20.4'
  });

  // save intervals để clear khi bot disconnect
  let intervals = [];

  bot.on('login', () => {
    console.log('✅ [' + new Date().toLocaleTimeString() + '] Bot "'+BOT_NAME+'" đã login vào', HOST+':'+PORT);
    // thử set creative (chỉ thành công nếu bot có quyền)
    try {
      bot.chat('/gamemode creative'); // nếu server cho phép
    } catch (e) {
      // không sao
    }

    // chat mỗi CHAT_MS
    intervals.push(setInterval(() => {
      if (bot && bot.chat) {
        bot.chat('Mình đang AFK giữ server online đây 🛡️');
      }
    }, CHAT_MS));

    // nhảy mỗi JUMP_MS (giữ hoạt động)
    intervals.push(setInterval(() => {
      try {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      } catch (e) {}
    }, JUMP_MS));
  });

  bot.on('spawn', () => {
    console.log('Bot đã spawn trong thế giới — bắt đầu hành vi AFK');
  });

  bot.on('end', () => {
    console.log('🔁 Kết nối bị đóng — sẽ thử kết nối lại sau 5s');
    intervals.forEach(clearInterval);
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('⚠️ Lỗi bot:', err && err.message ? err.message : err);
  });

  // optional: log kick reason
  bot.on('kicked', (reason) => {
    console.log('⚠️ Bot bị kick khỏi server:', reason);
  });

  return bot;
}

// start lần đầu
createBot();
