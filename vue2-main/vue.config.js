const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 5000,
    proxy: {
      "^/qcc": {
        target: "http://z.test.greatld.com",
        xfwd: false,
      },
    },
  },
});
