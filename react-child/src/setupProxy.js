const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("🚀 setupProxy.js loaded!");

  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://z.test.greatld.com",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/api": "" },

      onProxyReq: function (proxyReq, req, res) {
        console.log("📤 Proxying:", req.method, req.url);

        // 确保 cookie 被正确传递
        if (req.headers.cookie) {
          proxyReq.setHeader("Cookie", req.headers.cookie);
          console.log("🍪 Cookie found:", req.headers.cookie);
        }
      },
      onProxyRes: function (proxyRes, req, res) {
        console.log("📥 Response:", proxyRes.statusCode, req.url);

        // 设置 CORS 头
        const origin = req.headers.origin;
        if (origin) {
          proxyRes.headers["Access-Control-Allow-Origin"] = origin;
        }
        proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
      },
      onError: function (err, req, res) {
        console.error("❌ Proxy Error:", err.message);
      },
    })
  );
};
