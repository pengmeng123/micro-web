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

// 创建Vue实例
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
