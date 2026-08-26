import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Minus,
  Plus,
  Heart,
  ShoppingCart,
} from "lucide-react";

import { ProductRating } from "@/components/common/Product";
import { getProductById } from "@/services/product.service";

import {
  useCart,
  useWishlist,
} from "@/context";

const ProductDetails = () => {
  const { productId } = useParams();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(productId);
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#0B57D0] border-t-transparent" />
      </div>
    );
  }

  const wished = isInWishlist(product.id);

  const originalPrice = Math.round(
    product.price / (1 - product.discount / 100)
  );

  const handleAddToCart = () => {
    addToCart(product, quantity);

    toast.success(
      `${quantity} item${quantity > 1 ? "s" : ""} added to cart`
    );
  };

  const handleWishlist = () => {
    if (wished) {
      toggleWishlist(product);

      toast("Removed from Wishlist", {
        icon: "💔",
      });

      return;
    }

    toggleWishlist(product);

    toast.success("Added to Wishlist");
  };

  return (
    // -------------------------------------------------------
    // ProductDetails Layout
    // -------------------------------------------------------
    // Mobile: Image upar, details neeche (single column)
    // Desktop (lg): Side-by-side grid layout
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

        {/* -----------------------------------------------
            Product Image Section
        ----------------------------------------------- */}
        <div
          className="
            flex items-center justify-center
            rounded-2xl border border-gray-200
            bg-gray-50
            p-6 sm:p-10
          "
        >
          <img
            src={product.image}
            alt={product.title}
            className="
              h-64 w-full object-contain
              sm:h-80
              lg:h-96
            "
          />
        </div>

        {/* -----------------------------------------------
            Product Details Section
        ----------------------------------------------- */}
        <div>
          {/* Category Badge */}
          <span
            className="
              rounded-full bg-blue-100
              px-3 py-1
              text-sm font-medium text-blue-700
            "
          >
            {product.category}
          </span>

          {/* Product Title - responsive font size */}
          <h1
            className="
              mt-4
              text-2xl font-bold text-gray-900
              sm:text-3xl
              lg:text-4xl
            "
          >
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-4">
            <ProductRating
              rating={product.rating}
              ratingCount={product.ratingCount}
            />
          </div>

          {/* -----------------------------------------------
              Price Section
          ----------------------------------------------- */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {/* Current price */}
            <span className="text-3xl font-bold text-gray-900 sm:text-4xl">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            {/* Original price (strikethrough) */}
            <span className="text-lg text-gray-400 line-through sm:text-xl">
              ₹{Math.round(originalPrice).toLocaleString("en-IN")}
            </span>

            {/* Discount badge */}
            <span className="rounded bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
              {product.discount}% OFF
            </span>
          </div>

          {/* In Stock indicator */}
          <p className="mt-2 text-sm font-medium text-green-600">
            ✓ In Stock
          </p>

          {/* Product Description */}
          <p className="mt-6 leading-7 text-gray-600 sm:leading-8">
            {product.description}
          </p>

          {/* -----------------------------------------------
              Quantity Selector
          ----------------------------------------------- */}
          <div className="mt-7 flex items-center gap-4 sm:mt-8">
            <span className="font-semibold text-gray-800">Quantity</span>

            {/* +/- Controls */}
            <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
              {/* Decrease */}
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="flex h-10 w-10 items-center justify-center transition hover:bg-gray-100 active:scale-95"
                aria-label="Decrease quantity"
              >
                <Minus size={18} />
              </button>

              {/* Count */}
              <span className="w-10 text-center font-semibold">{quantity}</span>

              {/* Increase */}
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="flex h-10 w-10 items-center justify-center transition hover:bg-gray-100 active:scale-95"
                aria-label="Increase quantity"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* -----------------------------------------------
              Action Buttons
              -----------------------------------------------
              Mobile: stacked vertically (flex-col)
              sm+: side by side (flex-row)
          ----------------------------------------------- */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="
                flex flex-1 cursor-pointer items-center justify-center gap-2
                rounded-xl bg-[#0B57D0] py-4
                font-semibold text-white
                transition-all duration-200
                hover:bg-blue-700 active:scale-95
              "
            >
              <ShoppingCart size={20} />
              Add To Cart
            </button>

            {/* Wishlist Toggle */}
            <button
              type="button"
              onClick={handleWishlist}
              className="
                flex cursor-pointer items-center justify-center gap-2
                rounded-xl border border-gray-300 px-5 py-4
                font-medium text-gray-700
                transition-all duration-200
                hover:bg-gray-100 active:scale-95
              "
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={22}
                fill={wished ? "currentColor" : "none"}
                className={`transition-colors duration-200 ${
                  wished ? "text-red-500" : "text-gray-600"
                }`}
              />
              {wished ? "Wishlisted" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;