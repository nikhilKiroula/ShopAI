import api from "./api.service";

// Get user's wishlist
export const getWishlist = async () => {
  try {
    const response = await api.get("/wishlist");
    return response.data;
  } catch (error) {
    console.error(
      "Get wishlist error:",
      error.response?.data || error
    );
    throw error;
  }
};

// Add product to wishlist
export const addWishlistItem = async (productId) => {
  try {
    const response = await api.post(`/wishlist/${productId}`);

    return response.data;
  } catch (error) {
    console.error(
      "Add wishlist error:",
      error.response?.data || error
    );
    throw error;
  }
};

// Remove product from wishlist
export const removeWishlistItem = async (productId) => {
  try {
    const response = await api.delete(`/wishlist/${productId}`);

    return response.data;
  } catch (error) {
    console.error(
      "Remove wishlist error:",
      error.response?.data || error
    );
    throw error;
  }
};

// Clear wishlist
export const clearWishlist = async () => {
  try {
    const response = await api.delete("/wishlist");

    return response.data;
  } catch (error) {
    console.error(
      "Clear wishlist error:",
      error.response?.data || error
    );
    throw error;
  }
};