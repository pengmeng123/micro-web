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
    cors: {
      origin: true, // 允许跨域
      credentials: true, // 允许携带cookie
    },
    proxy: {
      "/qcc": {
        target: "http://z.test.greatld.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
