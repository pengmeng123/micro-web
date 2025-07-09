import axios from "axios";

// 创建axios实例
const instance = axios.create({
  baseURL: "/",
  timeout: 10000,
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
  return instance.post("/qcc/kzz/crm/v2/contact/search", params);
};

// 模拟联系人数据
const mockContactData = (params) => {
  const { pageIndex, pageSize } = params;
  const total = 56; // 模拟总数据量

  // 生成模拟数据
  const data = Array.from(
    { length: Math.min(pageSize, total - (pageIndex - 1) * pageSize) },
    (_, index) => {
      const id = (pageIndex - 1) * pageSize + index + 1;
      return {
        contactId: id,
        name: `联系人${id}`,
        customerName: `客户公司${Math.floor(id / 3) + 1}`,
        customerId: Math.floor(id / 3) + 1,
        position: ["经理", "总监", "CEO", "销售", "技术总监"][id % 5],
        mobile: `1${Math.floor(Math.random() * 9 + 1)}${String(id).padStart(
          9,
          "0"
        )}`.substring(0, 11),
        email: `contact${id}@example.com`,
        note: id % 3 === 0 ? `这是联系人${id}的备注信息` : "",
      };
    }
  );

  return {
    code: 200,
    message: "success",
    data,
    page: {
      current: pageIndex,
      pageSize,
      total,
    },
  };
};
