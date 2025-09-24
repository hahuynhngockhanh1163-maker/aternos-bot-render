// Gọi thư viện express
const express = require("express");
const app = express();

// Cổng mà Replit sẽ chạy (Replit sẽ tự dùng process.env.PORT)
const port = process.env.PORT || 3000;

// Route mặc định để kiểm tra server hoạt động
app.get("/", (req, res) => {
  res.send("✅ Server đang chạy!");
});

// Lắng nghe cổng
app.listen(port, () => {
  console.log(`🌍 Web server đang chạy tại cổng ${port}`);
});
