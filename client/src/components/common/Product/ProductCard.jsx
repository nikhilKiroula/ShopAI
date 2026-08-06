import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

import { ProductRating } from "./";

import { useCart } from "@/context";
import { useWishlist } from "@/context";

import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { id, title, image, price, rating, ratingCount, discount } = product;

  const { addToCart } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const wished = isInWishlist(id);

  const originalPrice = Math.round(price / (1 - discount / 100));

  const handleAddToCart = () => {
    addToCart(product);

    toast.success("Product added to cart");
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist(product);
  };

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Product Image */}

      <div
        className="
          relative
          flex
          h-60
          items-center
          justify-center
          overflow-hidden
          rounded-t-xl
          bg-gray-50
          p-5
        "
      >
        {/* Discount */}

        <span
          className="
            absolute
            left-3
            top-3
            z-10
            rounded-md
            bg-red-500
            px-2
            py-1
            text-xs
            font-semibold
            text-white
          "
        >
          {discount}% OFF
        </span>

        {/* Wishlist */}

        <button
          type="button"
          onClick={handleWishlist}
          className="
            absolute
            right-3
            top-3
            z-10
            rounded-full
            bg-white
            p-2
            shadow
            transition-all
            duration-200
            hover:scale-110
            active:scale-95
          "
        >
          <Heart
            size={18}
            fill={wished ? "currentColor" : "none"}
            className={`
              transition-colors
              duration-200
              ${wished ? "text-red-500" : "text-gray-600 hover:text-red-500"}
            `}
          />
        </button>

        {/* Product Image */}

        <Link
          to={`/products/${id}`}
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
          "
        >
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="
              h-full
              w-full
              object-contain
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        </Link>
      </div>

      {/* Product Details */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-4
        "
      >
        <ProductRating rating={rating} ratingCount={ratingCount} />

        <Link to={`/products/${id}`}>
          <h3
            className="
              mt-3
              min-h-12
              line-clamp-2
              text-sm
              font-semibold
              text-gray-800
              transition-colors
              hover:text-[#0B57D0]
            "
          >
            {title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-2">
          <span
            className="
              text-2xl
              font-bold
              text-gray-900
            "
          >
            ₹{Math.round(price * 85).toLocaleString("en-IN")}
          </span>

          <span
            className="
              text-sm
              text-gray-400
              line-through
            "
          >
            ₹{Math.round(originalPrice * 85).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Add To Cart */}

        <button
          type="button"
          onClick={handleAddToCart}
          className="
            mt-auto
            flex
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#0B57D0]
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-blue-700
            active:scale-95
          "
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
