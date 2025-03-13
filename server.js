const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")
const cors = require("cors")
require("dotenv").config()
const app = express()

// Cho phép tất cả các origin (hoặc cấu hình cụ thể)
app.use(cors())

// Proxy các request từ /api đến API backend
app.use(
  "/api",
  createProxyMiddleware({
    target: process.env.HOST, // API backend của bạn
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  })
)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Proxy server đang chạy tại cổng ${PORT}`)
})
