import { useState } from "react";
import toast from "react-hot-toast";

import { createProduct } from "@/services/product.service";

const categories = [
  "Electronics",
  "Mobiles",
  "Jewellery",
  "Men",
  "Women",
  "Home",
  "Beauty",
  "Appliances",
  "Sports",
  "Books",
  "Gaming",
];

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length > 5) {
      toast.error("You can select maximum 5 images");
      return;
    }

    setImages(selectedImages);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    // Add normal product fields
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("stock", formData.stock);

    // Add product images
    images.forEach((image) => {
      data.append("images", image);
    });

    const response = await createProduct(data);

    console.log("Product created:", response);

    toast.success("Product added successfully");

    // Reset form
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      stock: "",
    });

    setImages([]);
  } catch (error) {
    console.error(
      "Failed to create product:",
      error.response?.data || error
    );

    toast.error(
      error.response?.data?.message ||
        "Failed to add product"
    );
  }
};

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Add Product
        </h1>

        <p className="mt-1 text-gray-500">
          Add a new product to your store
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">

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
              placeholder="Enter product name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0]"
              required
            />
          </div>

          {/* Brand */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Brand
            </label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0]"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0]"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              min="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0]"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#0B57D0]"
              required
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Images */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Product Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full cursor-pointer rounded-lg border border-gray-300 p-2.5"
              required
            />

            <p className="mt-1 text-xs text-gray-500">
              Maximum 5 images
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows={5}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0]"
            required
          />
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-[#0B57D0] px-8 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
          >
            Add Product
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;