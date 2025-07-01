const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: ["z.test.greatld.com", "z.local.greatld.com"],
    port: 5000,
    proxy: {
      "^/qcc": {
        target: "http://z.test.greatld.com",
        changeOrigin: true,
        xfwd: false,
      },
    },
  },
});
