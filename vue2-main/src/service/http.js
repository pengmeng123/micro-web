import axios from "axios";
import router from "@/router";
import { logout } from "@/utils";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // request timeout
});

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    // 静默处理所有错误，不在控制台显示
    if (error.response) {
      const { status } = error.response;

      // 只在开发环境显示详细错误信息
      switch (status) {
        case 401:
          console.warn("401: 未授权访问");
          if (router.currentRoute.meta.needLogin !== 0) {
            logout();
          }
          return;
        default:
          console.warn(`HTTP ${status}: 请求失败`);
      }
    }

    // 其他错误仍然返回 rejected promise
    const customError = {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    };
    console.error(customError);

    return Promise.reject(customError);
  }
);

export default service;
