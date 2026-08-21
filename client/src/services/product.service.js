import api from "@/services/api.service";

export const getProducts = async (category, search) => {
  try {
    const params = new URLSearchParams();

    if (category) {
      params.append("category", category);
    }

    if (search) {
      params.append("search", search);
    }

    const query = params.toString();

    const response = await api.get(
      query ? `/products?${query}` : "/products",
    );

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
    console.error(
      "Error fetching products:",
      error.response?.data || error.message,
    );

    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);

    const product = response.data.data;

    return {
      id: product._id,
      title: product.name,
      image: product.images?.[0]?.url || "",
      price: product.price,
      discount: 20,
      rating: product.ratings?.average || 0,
      ratingCount: product.ratings?.count || 0,
      description: product.description,
      category: product.category,
      stock: product.stock,
    };
  } catch (error) {
    console.error(
      "Error fetching product:",
      error.response?.data || error.message,
    );

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