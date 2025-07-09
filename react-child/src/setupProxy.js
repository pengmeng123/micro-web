const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 处理 OPTIONS 预检请求
  app.options("/qcc/*", (req, res) => {
    res.header(
      "Access-Control-Allow-Origin",
      req.headers.origin || "http://z.local.greatld.com:5002"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
  });

  app.use(
    "/qcc",
    createProxyMiddleware({
      target: "http://z.test.greatld.com",
      changeOrigin: true,
      followRedirects: true, // 跟随重定向
      pathRewrite: {
        "^/qcc": "/qcc",
      },
    })
  );
};
