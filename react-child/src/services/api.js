import axios from "axios";

// 创建axios实例
const instance = axios.create({
  baseURL: "/",
  timeout: 10000,
  withCredentials: true, // 关键配置：确保 Cookie 传递
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等认证信息
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 只返回数据部分
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 联系人搜索API
export const contactSearch = (params) => {
  return instance.post("/api/qcc/kzz/crm/v2/contact/search", params);
};

export const getAreaList = (params) => {
  return instance.get("/api/qcc/kzz/schemas/areaList", params);
};
