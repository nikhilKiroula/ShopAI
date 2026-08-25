import api from "@/services/api.service";

// Create a new product
export const createProduct = async (formData) => {
  try {
    const response = await api.post("/products", formData);

    return response.data;
  } catch (error) {
    console.error(
      "Create product error:",
      error.response?.data || error
    );

    throw error;
  }
};


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
    const response = await api.get("/products/categories")

    return await response.data.data;
  } catch (error) {
    console.error("Error fetching categories:",
      error.response?.data || error.message);
    return [];
  }
};

// Get all products for Admin Panel
export const getAdminProducts = async () => {
  try {
    const response = await api.get("/products/admin");

    return response.data.data;
  } catch (error) {
    console.error(
      "Get admin products error:",
      error.response?.data || error
    );

    throw error;
  }
};

export const getAdminProductById = async (id) => {
  try {
    const response = await api.get(`/products/admin/${id}`);

    return response.data.data;
  } catch (error) {
    console.error(
      "Get admin product error:",
      error.response?.data || error
    );

    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);

    return response.data;
  } catch (error) {
    console.error(
      "Delete product error:",
      error.response?.data || error
    );

    throw error;
  }
};

// Update a product
export const updateProduct = async (productId, formData) => {
  try {
    const response = await api.patch(
      `/products/${productId}`,
      formData
    );

    return response.data;
  } catch (error) {
    console.error(
      "Update product error:",
      error.response?.data || error
    );

    throw error;
  }
};