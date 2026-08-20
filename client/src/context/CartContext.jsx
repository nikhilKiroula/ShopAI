import { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/api.service";
import { updateCartItem } from "@/services/cart.service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");

      console.log("Cart from backend:", response.data);

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

  useEffect(() => {
    fetchCart();
  }, []);

  // Add Product
  const addToCart = async (product, quantity = 1) => {
    console.log("Product:", product);

    try {
      const response = await api.post(`/cart/${product.id}`, {
        quantity,
      });

      console.log("Product added to backend cart:", response.data);

      await fetchCart();
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  // Remove Product

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Increase Quantity

  const increaseQuantity = async (item) => {
    const newQuantity = item.quantity + 1;

    const response = await updateCartItem(item.product._id, newQuantity);

    if (response?.success) {
      setCartItems(response.data.items);
    }
  };

  // Decrease Quantity

  const decreaseQuantity = async (item) => {
    if (item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;

    const response = await updateCartItem(item.product._id, newQuantity);

    if (response?.success) {
      setCartItems(response.data.items);
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
