import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vueJsx()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5003,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "^/qcc": {
        target: "http://z.test.greatld.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
