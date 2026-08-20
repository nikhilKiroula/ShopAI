import { createContext, useContext, useState, useEffect } from "react";

import api from "@/services/api.service";
import { updateCartItem } from "@/services/cart.service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch the user's cart from the backend
  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");

      console.log("Cart from backend:", response.data);

      // Convert backend cart structure into the structure
      // required by the frontend cart UI
      const items = response.data.data.items.map((item) => ({
        id: item.product._id,
        cartItemId: item._id,
        title: item.product.name,
        price: item.product.price,
        image: item.product.images[0]?.url,
        quantity: item.quantity,
      }));

      setCartItems(items);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  // Fetch the cart when the user opens the application
  useEffect(() => {
    fetchCart();
  }, []);

  // Add a product to the backend cart
  const addToCart = async (product, quantity = 1) => {
    console.log("Product:", product);

    try {
      const response = await api.post(`/cart/${product.id}`, {
        quantity,
      });

      console.log("Product added to backend cart:", response.data);

      // Refresh the cart after adding the product
      await fetchCart();
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  // Remove a product from the cart
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Increase the quantity of a cart item
  const increaseQuantity = async (item) => {
    const newQuantity = item.quantity + 1;

    try {
      const response = await updateCartItem(
        item.id,
        newQuantity
      );

      if (response?.success) {
        // Refresh cart data from the backend
        await fetchCart();
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  // Decrease the quantity of a cart item
  const decreaseQuantity = async (item) => {
    // Prevent quantity from going below 1
    if (item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;

    try {
      const response = await updateCartItem(
        item.id,
        newQuantity
      );

      if (response?.success) {
        // Refresh cart data from the backend
        await fetchCart();
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);