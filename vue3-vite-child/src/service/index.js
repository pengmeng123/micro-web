import Http from "./http";

export const customerDetail = (customerId) => {
  return Http.get(`/qcc/kzz/crm/v2/customer/${customerId}/1`, {});
};

export const customerContractSearch = (data) => {
  return Http.post("/qcc/kzz/crm/v2/contract/searchByCustomerIdsWithSum", data);
};

export const deleteCustomer = (customerId) => {
  return Http.delete(`/qcc/kzz/crm/v2/customer/${customerId}`);
};

export const getPersonalDetail = (userId) => {
  return Http.get(`/qcc/kzz/crm/dashboard/userInfo/${userId}`, {});
};

export const getTrackingReplyList = () => {
  return Http.get(
    `/qcc/kzz/crm/v2/trackingReply/replyList/1731125?pageIndex=1&pageSize=10`,
    {}
  );
};

export const likeAction = (id, params) => {
  return Http.post(
    `/qcc/kzz/crm/v2/trackingReply/replyLike/1731125/${id}`,
    params
  );
};
