import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { getAdminProducts, deleteProduct } from "@/services/product.service";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const data = await getAdminProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0B57D0] border-t-transparent" />
      </section>
    );
  }

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(productId);

      toast.success("Product deleted successfully");

      // Remove the deleted product from the current list
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      );
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>

        <p className="mt-1 text-gray-500">{products.length} products found</p>
      </div>

      {/* Products Table */}

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[900px]">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Stock
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                {/* Product */}

                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images?.[0]?.url || ""}
                      alt={product.name}
                      className="h-14 w-14 rounded-lg object-contain"
                    />

                    <div>
                      <p className="max-w-xs truncate font-medium">
                        {product.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {product.brand || "No brand"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Price */}

                <td className="px-6 py-4 font-semibold">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </td>

                {/* Category */}

                <td className="px-6 py-4">{product.category}</td>

                {/* Stock */}

                <td className="px-6 py-4">{product.stock}</td>

                {/* Status */}

                <td className="px-6 py-4">
                  {product.isActive ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                      Inactive
                    </span>
                  )}
                </td>

                {/* Actions */}

                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/admin/products/edit/${product._id}`)
                      }
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}

      {products.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No products found
          </h2>

          <p className="mt-2 text-gray-500">
            Add your first product from the Add Product page.
          </p>
        </div>
      )}
    </section>
  );
};

export default Products;
