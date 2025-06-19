const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 5001,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
