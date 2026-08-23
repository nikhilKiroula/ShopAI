import api from "./api.service";

export const getMyOrders = async () => {
  const response = await api.get("/orders");
  return response.data.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.patch(`/orders/${orderId}/cancel`);
  return response.data.data;
};
