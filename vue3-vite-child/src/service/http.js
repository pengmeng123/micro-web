import axios from "axios";
import Cookies from "js-cookie";

const service = axios.create({
  baseURL: "/", // url = base url + request url
  timeout: 5000, // request timeout
  withCredentials: true, // 重新启用，确保 Cookie 传递
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
          // 通知主应用跳转到登录页
          if (window.microApp) {
            Cookies.remove("CRMSESSID");
            window.microApp.dispatch({
              type: "jump-to-login",
            });
          } else {
            // 如果不在微前端环境中，直接跳转（用于独立开发调试）
            console.warn("401: 未授权访问，需要登录");
            // window.location.href = '/login';
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
