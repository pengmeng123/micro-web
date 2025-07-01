const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: ["z.test.greatld.com", "z.local.greatld.com"],
    port: 5001,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
