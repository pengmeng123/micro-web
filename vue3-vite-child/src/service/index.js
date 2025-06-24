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
