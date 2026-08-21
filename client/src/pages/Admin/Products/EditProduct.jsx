import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "@/services/api.service";
import { updateProduct } from "@/services/product.service";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    isActive: true,
  });

  const [images, setImages] = useState([]);

  // Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);

        const product = response.data.data;

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "",
          brand: product.brand || "",
          stock: product.stock || "",
          isActive: product.isActive ?? true,
        });
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to fetch product"
        );

        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle active/inactive status
  const handleStatusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      isActive: e.target.value === "true",
    }));
  };

  // Handle new images
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.brand ||
      formData.stock === ""
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setSubmitting(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("brand", formData.brand);
      data.append("stock", formData.stock);
      data.append("isActive", formData.isActive);

      // Only send images if new images were selected
      images.forEach((image) => {
        data.append("images", image);
      });

      await updateProduct(productId, data);

      toast.success("Product updated successfully");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update product"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0B57D0] border-t-transparent" />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Product
        </h1>

        <p className="mt-1 text-gray-500">
          Update your product information
        </p>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* Product Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
            placeholder="Enter product name"
          />
        </div>

        {/* Description */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
            placeholder="Enter product description"
          />
        </div>

        {/* Price + Stock */}

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
              placeholder="Enter stock"
            />
          </div>
        </div>

        {/* Category + Brand */}

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
              placeholder="Enter category"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Brand
            </label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
              placeholder="Enter brand"
            />
          </div>
        </div>

        {/* Status */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Status
          </label>

          <select
            value={String(formData.isActive)}
            onChange={handleStatusChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Images */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Replace Product Images
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <p className="mt-2 text-sm text-gray-500">
            Leave empty to keep the existing images.
          </p>
        </div>

        {/* Buttons */}

        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-xl bg-[#0B57D0] py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Updating..." : "Update Product"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-xl border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProduct;