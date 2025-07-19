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
      },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";
        proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
      },
      onError: function (err, req, res) {
        console.error("❌ Proxy Error:", err.message);
      },
    })
  );
};
