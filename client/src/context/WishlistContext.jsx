import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
  clearWishlist,
} from "@/services/wishlist.service";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    try {
      const response = await getWishlist();

      const products = response.data?.products || [];

      const items = products.map((product) => ({
        id: product._id,
        title: product.name,
        image: product.images?.[0]?.url || "",
        price: product.price,
        rating: product.ratings?.average || 0,
        ratingCount: product.ratings?.count || 0,
        category: product.category,
        description: product.description,
        stock: product.stock,
        isActive: product.isActive,
      }));

      setWishlistItems(items);
    } catch (error) {
      console.error(
        "Fetch wishlist error:",
        error.response?.data || error
      );

      setWishlistItems([]);
    }
  };

  // Fetch wishlist when app loads
  useEffect(() => {
    fetchWishlist();
  }, []);

  // Add product
  const addToWishlist = async (product) => {
    try {
      await addWishlistItem(product.id);

      await fetchWishlist();
    } catch (error) {
      console.error(
        "Add to wishlist error:",
        error.response?.data || error
      );

      throw error;
    }
  };

  // Remove product
  const removeFromWishlist = async (id) => {
    try {
      await removeWishlistItem(id);

      await fetchWishlist();
    } catch (error) {
      console.error(
        "Remove from wishlist error:",
        error.response?.data || error
      );

      throw error;
    }
  };

  // Check product
  const isInWishlist = (id) => {
    return wishlistItems.some(
      (item) => item.id === id
    );
  };

  // Toggle wishlist
  const toggleWishlist = async (product) => {
    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product);
      }
    } catch (error) {
      console.error(
        "Toggle wishlist error:",
        error.response?.data || error
      );
    }
  };

  // Clear wishlist
  const clearWishlistItems = async () => {
    try {
      await clearWishlist();

      setWishlistItems([]);
    } catch (error) {
      console.error(
        "Clear wishlist error:",
        error.response?.data || error
      );
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlistItems,
        refreshWishlist: fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);