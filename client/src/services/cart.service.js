import api from "./api.service";

export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await api.patch(`/cart/${productId}`, {
      quantity,
    });

    return response.data;
  } catch (error) {
    console.error("Update cart error:", error);
    return null;
  }
};