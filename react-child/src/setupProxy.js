const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://z.test.greatld.com",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/api": "" },
    })
  );
};
