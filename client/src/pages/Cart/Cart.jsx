import { Trash2, Minus, Plus } from "lucide-react";

import { useCart } from "@/context";
import {useNavigate} from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto flex h-[70vh] max-w-7xl items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Your Cart is Empty</h2>

          <p className="mt-3 text-gray-500">
            Add products to continue shopping.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Cart Items */}

        <div className="space-y-5">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-24 w-24 object-contain"
              />

              <div className="flex-1">
                <h2 className="font-semibold">{item.title}</h2>

                <p className="mt-2 font-bold text-[#0B57D0]">
                  ₹{Math.round(item.price * 85).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex items-center rounded-lg border">
                <button
                  className="p-3 hover:bg-gray-100"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  <Minus size={18} />
                </button>

                <span className="w-10 text-center">{item.quantity}</span>

                <button
                  className="p-3 hover:bg-gray-100"
                  onClick={() => increaseQuantity(item.id)}
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                className="text-red-500 cursor-pointer"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}

        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="mt-6 flex justify-between">
            <span>Total</span>

            <span className="font-bold text-[#0B57D0]">
              ₹{Math.round(totalPrice * 85).toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="
              mt-8
              w-full
              rounded-xl
              bg-[#0B57D0]
              py-3
              font-semibold
              text-white
              hover:bg-blue-700
            "
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
