// =====================================================
// Checkout.jsx
// =====================================================
// Checkout page jahan user:
//   1. Delivery address select karta hai
//   2. Payment method choose karta hai (COD / Online)
//   3. Order place karta hai
//
// Payment Flow:
//   COD:    Backend order create → navigate to /orders
//   ONLINE: Backend order → Razorpay modal → verify → /orders
//
// Mobile Responsive:
//   - Full-width buttons
//   - Stacked address cards
//   - Touch-friendly radio buttons
//   - Place Order button full width on all screens
// =====================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "@/context";
import api from "@/services/api.service";

import {
  createPaymentOrder,
  openRazorpayCheckout,
  verifyPayment,
} from "@/services/payment.service";

const Checkout = () => {
  const navigate = useNavigate();
  const { refreshCart } = useCart();

  // -------------------------------------------------------
  // State
  // -------------------------------------------------------

  // User ke saved addresses
  const [addresses, setAddresses] = useState([]);

  // Currently selected address ka ID
  const [selectedAddressId, setSelectedAddressId] = useState("");

  // Selected payment method: "COD" ya "ONLINE"
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Order place ho raha hai? (loading state)
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Page load pe addresses fetch karo
  useEffect(() => {
    // -------------------------------------------------------
    // fetchAddresses useEffect ke andar define ki gayi hai
    // taaki setState directly effect body mein na ho
    // (ESLint rule: react-hooks/set-state-in-effect)
    // -------------------------------------------------------
    const fetchAddresses = async () => {
      try {
        const response = await api.get("/addresses");
        const savedAddresses = response.data.data || [];

        setAddresses(savedAddresses);

        // Default address prefer karo, warna pehla address select karo
        setSelectedAddressId(
          savedAddresses.find((address) => address.isDefault)?._id ||
            savedAddresses[0]?._id ||
            "",
        );
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Could not load addresses",
        );
      }
    };

    fetchAddresses();
  }, []);

  // -------------------------------------------------------
  // Place Order Handler
  // -------------------------------------------------------
  const handlePlaceOrder = async () => {
    // Address select nahi kiya toh error
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    try {
      setIsSubmitting(true);

      // Backend mein order create karo
      const orderResponse = await api.post("/orders", {
        addressId: selectedAddressId,
        paymentMethod,
      });

      const order = orderResponse.data.data;

      // ---------------------------------------------------
      // COD Flow
      // ---------------------------------------------------
      if (paymentMethod === "COD") {
        await refreshCart(); // Cart empty karo backend clear karne ke baad
        toast.success("Order placed! Pay on delivery.");
        navigate("/orders");
        return;
      }

      // ---------------------------------------------------
      // Online Payment Flow (Razorpay)
      // ---------------------------------------------------
      const payment = await createPaymentOrder(order._id);    // Razorpay order banao
      const result = await openRazorpayCheckout(payment);      // Razorpay modal kholo
      await verifyPayment({                                     // Backend pe verify karo
        razorpayOrderId: result.razorpay_order_id,
        razorpayPaymentId: result.razorpay_payment_id,
        razorpaySignature: result.razorpay_signature,
      });

      await refreshCart();
      toast.success("Payment successful! Order confirmed.");
      navigate("/orders");

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Could not place order",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10">

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Checkout
        </h1>
        <p className="mt-1 text-gray-500">
          Select your delivery address and payment method
        </p>
      </div>

      {/* ===================================================
          DELIVERY ADDRESS SECTION
      =================================================== */}
      <div>
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold sm:text-xl">
            Delivery Address
          </h2>

          {/* Add New Address Button */}
          <button
            type="button"
            onClick={() => navigate("/addresses/new")}
            className="
              rounded-lg bg-[#0B57D0] px-4 py-2
              text-sm font-semibold text-white
              transition hover:bg-blue-700
              active:scale-95
            "
          >
            + Add New
          </button>
        </div>

        {/* Address Cards */}
        <div className="mt-4 space-y-3">
          {addresses.length === 0 ? (
            // Empty state: No addresses found
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-500">No saved addresses found.</p>

              <button
                type="button"
                onClick={() => navigate("/addresses/new")}
                className="
                  mt-4 rounded-lg bg-[#0B57D0] px-5 py-2
                  text-sm font-semibold text-white
                  hover:bg-blue-700
                "
              >
                Add Your First Address
              </button>
            </div>
          ) : (
            // Address selection cards
            addresses.map((address) => (
              <label
                key={address._id}
                className={`
                  block cursor-pointer rounded-xl border p-4 transition
                  sm:p-5
                  ${
                    selectedAddressId === address._id
                      ? "border-[#0B57D0] bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  {/* Radio Button */}
                  <input
                    type="radio"
                    name="address"
                    value={address._id}
                    checked={selectedAddressId === address._id}
                    onChange={() => setSelectedAddressId(address._id)}
                    className="mt-1 h-4 w-4 accent-[#0B57D0]"
                  />

                  {/* Address Details */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {address.label}
                      </h3>

                      {/* Default badge */}
                      {address.isDefault && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="mt-1 font-medium text-gray-800">
                      {address.fullName}
                    </p>
                    <p className="text-sm text-gray-600">{address.addressLine}</p>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.state} - {address.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">{address.country}</p>
                    <p className="mt-1 text-sm text-gray-700">
                      📞 {address.phone}
                    </p>
                  </div>
                </div>
              </label>
            ))
          )}
        </div>

        {/* Manage all addresses link */}
        {addresses.length > 0 && (
          <button
            type="button"
            onClick={() => navigate("/addresses")}
            className="mt-3 text-sm font-semibold text-[#0B57D0] hover:underline"
          >
            Manage My Addresses →
          </button>
        )}
      </div>

      {/* ===================================================
          PAYMENT METHOD SECTION
      =================================================== */}
      <div className="mt-8 sm:mt-10">
        <h2 className="text-lg font-semibold sm:text-xl">
          Payment Method
        </h2>

        <div className="mt-4 space-y-3">
          {/* COD Option */}
          <label
            className={`
              flex cursor-pointer items-center gap-3
              rounded-xl border p-4 transition
              ${paymentMethod === "COD"
                ? "border-[#0B57D0] bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
              }
            `}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-4 w-4 accent-[#0B57D0]"
            />
            <div>
              <p className="font-medium text-gray-900">Cash on Delivery</p>
              <p className="text-sm text-gray-500">Pay when your order arrives</p>
            </div>
          </label>

          {/* Online Payment Option */}
          <label
            className={`
              flex cursor-pointer items-center gap-3
              rounded-xl border p-4 transition
              ${paymentMethod === "ONLINE"
                ? "border-[#0B57D0] bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
              }
            `}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="ONLINE"
              checked={paymentMethod === "ONLINE"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-4 w-4 accent-[#0B57D0]"
            />
            <div>
              <p className="font-medium text-gray-900">Pay Online with Razorpay</p>
              <p className="text-sm text-gray-500">
                UPI, Card, Net Banking — all secure
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* ===================================================
          PLACE ORDER BUTTON
          ===================================================
          `w-full` se full width on all screens.
          Disabled when no address or order is processing.
      =================================================== */}
      <div className="mt-8 border-t pt-6 sm:mt-10">
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={isSubmitting || !selectedAddressId}
          className="
            w-full
            rounded-xl
            bg-[#0B57D0]
            py-4
            text-base
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-60

            sm:w-auto sm:px-10
          "
        >
          {isSubmitting
            ? "Processing..."
            : paymentMethod === "ONLINE"
              ? "Pay Now"
              : "Place Order"}
        </button>
      </div>
    </section>
  );
};

export default Checkout;