import { Heart, ShoppingCart, Trash2 } from "lucide-react";

import { useWishlist } from "@/context";
import { useCart } from "@/context";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const { addToCart } = useCart();

  const handleMoveToCart = async (item) => {
    try {
      await addToCart(item);
      await removeFromWishlist(item.id);
    } catch (error) {
      console.error("Move to cart error:", error);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <section className="mx-auto flex h-[70vh] max-w-7xl items-center justify-center px-4">
        <div className="text-center">
          <Heart size={60} className="mx-auto text-red-500" />

          <h2 className="mt-5 text-3xl font-bold">Your Wishlist is Empty</h2>

          <p className="mt-3 text-gray-500">
            Save your favourite products here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>

          <p className="mt-2 text-gray-500">{wishlistItems.length} Items</p>
        </div>
      </div>

      {/* Wishlist Grid */}

      <div
        className="
          grid
          grid-cols-2
          gap-4

          md:grid-cols-3

          lg:grid-cols-4
        "
      >
        {wishlistItems.map((item) => (
          <article
            key={item.id}
            className="
              flex
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
            {/* Image */}

            <div
              className="
                flex
                h-60
                items-center
                justify-center
                bg-gray-50
                p-5
              "
            >
              <img
                src={item.image}
                alt={item.title}
                className="
                  h-full
                  w-full
                  object-contain
                "
              />
            </div>

            {/* Details */}

            <div
              className="
                flex
                flex-1
                flex-col
                p-4
              "
            >
              <h2
                className="
                  line-clamp-2
                  text-sm
                  font-semibold
                  text-gray-800
                "
              >
                {item.title}
              </h2>

              <p
                className="
                  mt-3
                  text-2xl
                  font-bold
                  text-[#0B57D0]
                "
              >
                ₹{Math.round(item.price * 85).toLocaleString("en-IN")}
              </p>

              <div className="mt-auto flex gap-3 pt-5">
                <button
                  type="button"
                  onClick={() => handleMoveToCart(item)}
                  className="
                    flex
                    flex-1
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
                  Move to Cart
                </button>

                <button
                  type="button"
                  onClick={() => removeFromWishlist(item.id)}
                  className="
                    cursor-pointer
                    rounded-lg
                    border
                    border-red-200
                    px-4
                    text-red-500
                    transition-all
                    duration-200
                    hover:bg-red-50
                    active:scale-95
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Wishlist;
