// =====================================================
// Cart.jsx
// =====================================================
// Shopping Cart page - user ke cart items yahan
// display honge quantity control ke saath.
//
// Features:
//   - Cart items list (image, name, price, qty controls)
//   - Quantity increase/decrease
//   - Item remove karo
//   - Order summary (total price)
//   - Checkout button
//   - Clear cart button
//
// Mobile Responsive:
//   - Cart items mobile pe stack hote hain (flex-col)
//   - Image chhoti hoti hai mobile pe
//   - Quantity controls touch-friendly hain
//   - Summary card bottom mein aata hai mobile pe
// =====================================================

import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "@/context";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // -------------------------------------------------------
  // Cart Context
  // -------------------------------------------------------
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCartItems,
  } = useCart();

  const navigate = useNavigate();

  // -------------------------------------------------------
  // Total Price Calculation
  // -------------------------------------------------------
  // Har item ka price × quantity add karo
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // -------------------------------------------------------
  // Empty Cart View
  // -------------------------------------------------------
  // Agar cart empty hai toh centered message dikhao
  if (cartItems.length === 0) {
    return (
      <section className="mx-auto flex h-[70vh] max-w-7xl items-center justify-center px-4">
        <div className="text-center">
          {/* Empty cart icon */}
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />

          <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Your Cart is Empty
          </h2>

          <p className="mt-3 text-gray-500">
            Add products to continue shopping.
          </p>

          {/* Shop now button */}
          <Link
            to="/products"
            className="
              mt-6 inline-block
              rounded-xl bg-[#0B57D0] px-6 py-3
              font-semibold text-white
              transition hover:bg-blue-700
            "
          >
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10">

      {/* Page Heading */}
      <h1 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">
        Shopping Cart
        <span className="ml-2 text-base font-normal text-gray-500">
          ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
        </span>
      </h1>

      {/* -------------------------------------------------------
          Main Grid: Items (left) + Summary (right)
          -------------------------------------------------------
          Mobile: single column (items upar, summary neeche)
          Desktop (lg): 2 columns - [2fr items | 1fr summary]
      ------------------------------------------------------- */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:gap-8">

        {/* =================================================
            Cart Items List
        ================================================= */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="
                rounded-xl
                border border-gray-200
                bg-white
                p-4
                shadow-sm
                sm:p-5
              "
            >
              {/* -----------------------------------------------
                  Cart Item Row
                  -----------------------------------------------
                  Mobile: image + content vertically stacked
                  sm+: horizontal row layout
              ----------------------------------------------- */}
              <div className="flex gap-4">

                {/* Product Image */}
                <div className="shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      h-20 w-20 rounded-lg
                      object-contain

                      sm:h-24 sm:w-24
                    "
                  />
                </div>

                {/* Product Info + Controls */}
                <div className="flex flex-1 flex-col gap-3">

                  {/* Title + Delete Button Row */}
                  <div className="flex items-start justify-between gap-2">
                    {/* Product Title */}
                    <h2 className="
                      line-clamp-2
                      text-sm font-semibold text-gray-800
                      sm:text-base
                    ">
                      {item.title}
                    </h2>

                    {/* Delete Button */}
                    <button
                      type="button"
                      className="
                        shrink-0
                        rounded-lg p-1.5
                        text-red-400
                        transition-colors
                        hover:bg-red-50 hover:text-red-600
                      "
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Price + Quantity Controls Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3">

                    {/* Price */}
                    <p className="text-lg font-bold text-[#0B57D0]">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>

                    {/* -----------------------------------------------
                        Quantity Controls
                        -----------------------------------------------
                        - (minus) | count | + (plus)
                        Touch-friendly large tap areas
                    ----------------------------------------------- */}
                    <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                      {/* Decrease Button */}
                      <button
                        type="button"
                        className="
                          flex h-9 w-9 items-center justify-center
                          transition-colors hover:bg-gray-100
                          active:bg-gray-200
                        "
                        onClick={() => decreaseQuantity(item)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>

                      {/* Quantity Count */}
                      <span className="w-10 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      {/* Increase Button */}
                      <button
                        type="button"
                        className="
                          flex h-9 w-9 items-center justify-center
                          transition-colors hover:bg-gray-100
                          active:bg-gray-200
                        "
                        onClick={() => increaseQuantity(item)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Per-item Price */}
                  <p className="text-xs text-gray-400">
                    ₹{item.price.toLocaleString("en-IN")} per item
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =================================================
            Order Summary Card
        ================================================= */}
        <div className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

          {/* Price Breakdown */}
          <div className="mt-5 space-y-3 border-b border-gray-200 pb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{Math.round(totalPrice).toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Charges</span>
              <span className="font-medium text-green-600">FREE</span>
            </div>
          </div>

          {/* Total */}
          <div className="mt-4 flex justify-between">
            <span className="text-base font-semibold">Total Amount</span>
            <span className="text-xl font-bold text-[#0B57D0]">
              ₹{Math.round(totalPrice).toLocaleString("en-IN")}
            </span>
          </div>

          {/* Checkout Button - full width */}
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="
              mt-6
              w-full
              rounded-xl
              bg-[#0B57D0]
              py-3.5
              text-base
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              active:scale-95
            "
          >
            Proceed to Checkout
          </button>

          {/* Clear Cart */}
          <button
            type="button"
            onClick={clearCartItems}
            className="
              mt-3
              w-full
              rounded-xl
              py-2.5
              text-sm
              font-medium
              text-red-500
              transition
              hover:bg-red-50 hover:text-red-700
            "
          >
            Clear Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
