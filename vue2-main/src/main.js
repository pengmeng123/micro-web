import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import microApp from "@micro-zoe/micro-app";
import Antd from "ant-design-vue";

import "ant-design-vue/dist/antd.css";
import "./styles/index.less";

// 使用Ant Design Vue
Vue.use(Antd);

// 配置微前端
microApp.start();

// 设置为生产环境提示
Vue.config.productionTip = false;

// 全局处理未捕获的 Promise 错误
window.addEventListener("unhandledrejection", function (event) {
  // 检查是否是 HTTP 401 错误
  if (
    event.reason?.status === 401 ||
    event.reason?.response?.status === 401 ||
    (event.reason?.message && event.reason.message.includes("401"))
  ) {
    // 阻止错误显示在控制台
    event.preventDefault();
    console.warn("401 错误已被静默处理");
  }
});

// 创建Vue实例
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
