import axios from "axios";

const service = axios.create({
  baseURL: "/", // url = base url + request url
  timeout: 5000, // request timeout
  withCredentials: true, // 重新启用，确保 Cookie 传递
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log("接口信息报错" + error);
    return Promise.reject(error);
  }
);

export default service;
