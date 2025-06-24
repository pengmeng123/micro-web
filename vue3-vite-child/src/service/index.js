import Http from "./http";

export const customerDetail = (customerId) => {
  return Http.get(`/qcc/kzz/crm/v2/customer/${customerId}/1`, {});
};
