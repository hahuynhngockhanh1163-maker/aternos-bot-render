const mineflayer = require("mineflayer");

const HOST = "minecraftsinhto-MQmj.aternos.me"; // đổi thành host Aternos của bạn
const PORT = 19484; 
const BOT_NAME = "AFK_Bot_01";

// Các khoảng thời gian
const CHAT_INTERVAL_MS = 4 * 60 * 1000;   // 4 phút
const JUMP_INTERVAL_MS = 45 * 1000;       // 45s
const LOOK_INTERVAL_MS = 35 * 1000;       // 35s
const WALK_INTERVAL_MS = 2 * 60 * 1000;   // 2 phút

function createBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: BOT_NAME
  });

  bot.on("login", () => {
    console.log(`[${new Date().toLocaleTimeString()}] Bot ${BOT_NAME} đã login vào ${HOST}:${PORT}`);
    bot.chat("/gamemode creative"); // nếu bạn có OP
  });

  // Chat giữ online
  setInterval(() => {
    if (bot.players) {
      bot.chat("Mình đang AFK giữ server online đây 😎");
    }
  }, CHAT_INTERVAL_MS);

  // Nhảy
  setInterval(() => {
    if (bot.player) {
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 300 + Math.random() * 700);
    }
  }, JUMP_INTERVAL_MS);

  // Nhìn xung quanh
  setInterval(() => {
    if (bot.player && bot.entity) {
      const yaw = (Math.random() - 0.5) * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * 0.5;
      bot.look(yaw, pitch, true);
    }
  }, LOOK_INTERVAL_MS);

  // Đi bộ
  setInterval(() => {
    if (bot.player) {
      const directions = ["forward", "back", "left", "right"];
      const dir = directions[Math.floor(Math.random() * directions.length)];
      bot.setControlState(dir, true);

      setTimeout(() => {
        bot.setControlState(dir, false);
      }, 2000 + Math.random() * 2000);
    }
  }, WALK_INTERVAL_MS);

  // Reconnect khi bị kick/tắt
  bot.on("end", () => {
    console.log("⚠️ Bot bị kick, sẽ tự reconnect sau 5s...");
    setTimeout(createBot, 5000);
  });

  bot.on("error", (err) => {
    console.log("❌ Lỗi bot:", err.message);
  });
}

createBot();
