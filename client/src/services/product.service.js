import api from "@/services/api.service";

export const getProducts = async () => {
  try {
    const response = await api.get("/products");

    const products = response.data.data;

    return products.map((product) => ({
      id: product._id,
      title: product.name,
      image: product.images?.[0]?.url || "",
      price: product.price,
      discount: 20,
      rating: product.ratings?.average || 0,
      ratingCount: product.ratings?.count || 0,
      category: product.category,
      description: product.description,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${id}`
    );

    const product = await response.json();

    return {
      id: product.id,

      title: product.title,

      image: product.image,

      price: product.price,

      discount: 20,

      rating: product.rating.rate,

      ratingCount: product.rating.count,

      description: product.description,

      category: product.category,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Get All Categories

export const getCategories = async () => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get Products By Category

export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );

    const data = await response.json();

    return data.map((product) => ({
      id: product.id,

      title: product.title,

      image: product.image,

      price: product.price,

      discount: 20,

      rating: product.rating.rate,

      ratingCount: product.rating.count,

      category: product.category,

      description: product.description,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};