import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ProductGrid } from "@/components/common/Product";

import { getProducts } from "@/services/product.service";

const categoryTitles = {
  electronics: "Electronics",
  jewelery: "Jewellery",
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
  mobiles: "Mobiles",
  home: "Home",
  beauty: "Beauty",
  appliances: "Appliances",
  sports: "Sports",
  books: "Books",
  gaming: "Gaming",
  offers: "Offers",
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();

      setProducts(data);

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return filtered;
  }, [products, category, search]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case "low":
        return sorted.sort((a, b) => a.price - b.price);

      case "high":
        return sorted.sort((a, b) => b.price - a.price);

      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);

      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  if (loading) {
    return (
      <section className="mx-auto flex h-[60vh] max-w-7xl items-center justify-center px-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#0B57D0] border-t-transparent" />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {category ? categoryTitles[category] || category : "All Products"}
          </h1>

          <p className="mt-1 text-gray-500">
            {filteredProducts.length} Products Found
            {search && (
              <span className="ml-2 font-medium text-[#0B57D0]">
                for "{search}"
              </span>
            )}
          </p>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
  cursor-pointer
  rounded-lg
  border
  border-gray-300
  bg-white
  px-4
  py-2.5
  pr-10
  text-sm
  font-medium
  text-gray-700
  shadow-sm
  outline-none
  transition-all
  duration-200
  hover:border-[#0B57D0]
  hover:shadow-md
  focus:border-[#0B57D0]
  focus:ring-2
  focus:ring-[#0B57D0]/20
"
        >
          <option value="featured">Featured</option>

          <option value="low">Price: Low to High</option>

          <option value="high">Price: High to Low</option>

          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Products */}

      {filteredProducts.length > 0 ? (
        <ProductGrid products={sortedProducts} />
      ) : (
        <div
          className="
            flex
            h-72
            items-center
            justify-center
            rounded-xl
            border
            border-dashed
            border-gray-300
            bg-gray-50
          "
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              {categoryTitles[category] || "Products"}
            </h2>

            <p className="mt-3 text-gray-500">Products coming soon 🚀</p>

            <p className="mt-1 text-sm text-gray-400">
              Stay tuned for new arrivals.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
