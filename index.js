// ======================
// 1. BOT ATERNOS
// ======================
const fetch = require("node-fetch");

// Hàm tự động ping Aternos (thay URL API hoặc endpoint phù hợp với bot bạn đang dùng)
async function pingAternos() {
  try {
    const res = await fetch("https://aternos.org/go/"); // 👈 thay bằng link login/start server của bạn
    console.log("✅ Ping Aternos:", res.status);
  } catch (err) {
    console.error("❌ Lỗi ping Aternos:", err.message);
  }
}

// Ping mỗi 10 phút (600000 ms)
setInterval(pingAternos, 600000);
pingAternos(); // chạy ngay lần đầu

// ======================
// 2. WEB SERVER EXPRESS
// ======================
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// Route mặc định
app.get("/", (req, res) => {
  res.send("✅ Bot Aternos + Web server đang chạy 24/7!");
});

// Chạy web server
app.listen(port, () => {
  console.log(`🌍 Web server đang chạy tại cổng ${port}`);
});
