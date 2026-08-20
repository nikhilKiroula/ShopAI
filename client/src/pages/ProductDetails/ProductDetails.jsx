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
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product Image */}

        <div
          className="
            flex
            items-center
            justify-center
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            p-10
          "
        >
          <img
            src={product.image}
            alt={product.title}
            className="
              h-96
              w-full
              object-contain
            "
          />
        </div>

        {/* Product Details */}

        <div>
          <span
            className="
              rounded-full
              bg-blue-100
              px-3
              py-1
              text-sm
              font-medium
              text-blue-700
            "
          >
            {product.category}
          </span>

          <h1
            className="
              mt-4
              text-4xl
              font-bold
              text-gray-900
            "
          >
            {product.title}
          </h1>

          <div className="mt-4">
            <ProductRating
              rating={product.rating}
              ratingCount={product.ratingCount}
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-4xl font-bold">
              ₹
              {
                product.price 
              .toLocaleString("en-IN")}
            </span>

            <span
              className="
                text-xl
                text-gray-400
                line-through
              "
            >
              ₹
              {Math.round(
                originalPrice
              ).toLocaleString("en-IN")}
            </span>

            <span
              className="
                rounded
                bg-red-100
                px-2
                py-1
                text-sm
                font-semibold
                text-red-600
              "
            >
              {product.discount}% OFF
            </span>
          </div>

          <p
            className="
              mt-2
              text-sm
              font-medium
              text-green-600
            "
          >
            ✓ In Stock
          </p>

          <p
            className="
              mt-8
              leading-8
              text-gray-600
            "
          >
            {product.description}
          </p>

          {/* Quantity */}

          <div className="mt-8 flex items-center gap-5">
            <span className="font-semibold">
              Quantity
            </span>

            <div
              className="
                flex
                items-center
                overflow-hidden
                rounded-lg
                border
              "
            >
              <button
                type="button"
                onClick={() =>
                  setQuantity((prev) =>
                    Math.max(1, prev - 1)
                  )
                }
                className="
                  cursor-pointer
                  p-3
                  transition
                  hover:bg-gray-100
                  active:scale-95
                "
              >
                <Minus size={18} />
              </button>

              <span className="w-10 text-center">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((prev) => prev + 1)
                }
                className="
                  cursor-pointer
                  p-3
                  transition
                  hover:bg-gray-100
                  active:scale-95
                "
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}

          <div
            className="
              mt-10
              flex
              flex-col
              gap-4

              sm:flex-row
            "
          >
            <button
              type="button"
              onClick={handleAddToCart}
              className="
                flex
                flex-1
                cursor-pointer
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#0B57D0]
                py-4
                font-semibold
                text-white
                transition-all
                duration-200
                hover:bg-blue-700
                active:scale-95
              "
            >
              <ShoppingCart size={20} />
              Add To Cart
            </button>

            <button
              type="button"
              onClick={handleWishlist}
              className="
                cursor-pointer
                rounded-xl
                border
                border-gray-300
                px-5
                transition-all
                duration-200
                hover:bg-gray-100
                active:scale-95
              "
            >
              <Heart
                size={22}
                fill={
                  wished
                    ? "currentColor"
                    : "none"
                }
                className={`
                  transition-colors
                  duration-200
                  ${
                    wished
                      ? "text-red-500"
                      : "text-gray-600"
                  }
                `}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;