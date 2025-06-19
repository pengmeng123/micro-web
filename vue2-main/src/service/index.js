import Http from "./http";

export const getProfile = (params) => {
  return Http.get("/qcc/kzz/profile", params);
};
