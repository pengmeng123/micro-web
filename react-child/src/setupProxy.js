const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/qcc",
    createProxyMiddleware({
      target: "http://z.test.greatld.com",
      changeOrigin: true,
      followRedirects: true, // 跟随重定向
      secure: false,
      // 关键配置：确保 cookie 能够传递
      cookieDomainRewrite: {
        "z.test.greatld.com": "z.local.greatld.com",
      },
      cookiePathRewrite: {
        "*": "/",
      },
      pathRewrite: {
        "^/qcc": "/qcc",
      },
      onProxyReq: function (proxyReq, req, res) {
        // 确保请求头正确设置
        proxyReq.setHeader("Accept", "application/json, text/plain, */*");
        proxyReq.setHeader("Content-Type", "application/json");

        // 确保 cookie 被正确传递
        console.log("🔍 All request headers:", req.headers);
        if (req.headers.cookie) {
          proxyReq.setHeader("Cookie", req.headers.cookie);
          console.log("🍪 Cookie found and set:", req.headers.cookie);
        } else {
          console.warn("⚠️  No cookie found in request headers");
          console.warn("Available headers:", Object.keys(req.headers));
        }

        // 添加一些可能需要的认证相关头部
        proxyReq.setHeader("X-Requested-With", "XMLHttpRequest");
        proxyReq.setHeader("Referer", "http://z.local.greatld.com:5002/");
        proxyReq.setHeader("Origin", "http://z.local.greatld.com:5002");

        console.log("🚀 Proxy Request:");
        console.log("  Method:", req.method);
        console.log("  Original URL:", req.url);
        console.log("  Target URL:", proxyReq.path);
        console.log("  Headers:", proxyReq.getHeaders());
      },
      onProxyRes: function (proxyRes, req, res) {
        console.log("📥 Proxy Response:");
        console.log("  Status:", proxyRes.statusCode);
        console.log("  Content-Type:", proxyRes.headers["content-type"]);
        console.log("  Location:", proxyRes.headers["location"]);

        // 如果返回 HTML，打印警告
        if (proxyRes.headers["content-type"]?.includes("text/html")) {
          console.warn("⚠️  WARNING: API returned HTML instead of JSON!");
          console.warn("  This usually means:");
          console.warn("  1. Authentication required (login page)");
          console.warn("  2. Wrong endpoint (404 page)");
          console.warn("  3. Server error (error page)");
        }

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
