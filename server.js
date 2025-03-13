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
    logLevel: "debug", // Log chi tiết từ http-proxy-middleware
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxying request: ${req.method} ${req.url}`)
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(
        `Received response: ${req.method} ${req.url} with status ${proxyRes.statusCode}`
      )
    },
    onError: (err, req, res) => {
      console.error("Proxy error:", err)
    },
  })
)
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Proxy server đang chạy tại cổng ${PORT}`)
})
