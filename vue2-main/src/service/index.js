import Http from "./http";

export const getProfile = (params) => {
  return Http.get("/qcc/kzz/profile", params);
};

export const customerSearch = (params) => {
  return Http.post("/qcc/kzz/crm/v2/customer/search", params);
};

export const login = (params) => {
  return Http.post("/qcc/user/buser/login/passwd", params);
};

export const getMessageNum = () => {
  return Http.get("/qcc/kzz/crm/app/message/type/messageNum?oldMsg=1");
};

export const handleLogout = () => {
  return Http.get("/qcc/user/buser/logout");
};
