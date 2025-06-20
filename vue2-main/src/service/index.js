import Http from "./http";

export const getProfile = (params) => {
  return Http.get("/qcc/kzz/profile", params);
};

export const customerSearch = (params) => {
  return Http.post("/qcc/kzz/crm/v2/customer/search", params);
};
