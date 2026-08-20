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

export const removeCartItem = async (productId) => {
    try {
        const response = await api.delete(`/cart/${productId}`);

        return response.data;
    } catch (error) {
        console.error("Remove cart item error:", error);
        return null;
    }
};

// Clear all items from the cart
export const clearCart = async () => {
    try {
        const response = await api.delete("/cart");

        return response.data;
    } catch (error) {
        console.error("Clear cart error:", error);
        return null;
    }
};