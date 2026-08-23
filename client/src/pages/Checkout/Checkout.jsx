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

  // Store user's saved addresses
  const [addresses, setAddresses] = useState([]);

  // Currently selected delivery address
  const [selectedAddressId, setSelectedAddressId] = useState("");

  // Selected payment method
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Loading state while placing order/payment
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user's saved addresses
  const fetchAddresses = async () => {
    try {
      const response = await api.get("/addresses");

      const savedAddresses = response.data.data || [];

      setAddresses(savedAddresses);

      // Select default address first
      // If no default exists, select first address
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

  // Fetch addresses when checkout page loads
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Create order and handle payment
  const handlePlaceOrder = async () => {
    // Address is required before placing order
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    try {
      setIsSubmitting(true);

      // Create order in backend
      const orderResponse = await api.post("/orders", {
        addressId: selectedAddressId,
        paymentMethod,
      });

      const order = orderResponse.data.data;

      // -----------------------------
      // COD FLOW
      // -----------------------------

      if (paymentMethod === "COD") {
        // Refresh cart because backend clears it after order creation
        await refreshCart();

        toast.success(
          "Order placed successfully. You can pay on delivery.",
        );

        navigate("/orders");

        return;
      }

      // -----------------------------
      // ONLINE PAYMENT FLOW
      // -----------------------------

      // Create Razorpay order
      const payment = await createPaymentOrder(order._id);

      // Open Razorpay checkout modal
      const result = await openRazorpayCheckout(payment);

      // Verify Razorpay payment on backend
      await verifyPayment({
        razorpayOrderId: result.razorpay_order_id,
        razorpayPaymentId: result.razorpay_payment_id,
        razorpaySignature: result.razorpay_signature,
      });

      // Payment successful, refresh cart
      await refreshCart();

      toast.success("Payment successful and order confirmed.");

      // Go to orders page
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
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Checkout
        </h1>

        <p className="mt-1 text-gray-500">
          Select your delivery address and payment method
        </p>
      </div>

      {/* -------------------------------- */}
      {/* DELIVERY ADDRESS */}
      {/* -------------------------------- */}

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Delivery Address
          </h2>

          {/* Add new address button */}
          <button
            type="button"
            onClick={() => navigate("/addresses/new")}
            className="rounded-lg bg-[#0B57D0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            + Add New Address
          </button>
        </div>

        {/* Existing addresses */}
        <div className="mt-4 space-y-4">
          {addresses.length === 0 ? (
            // Show message when user has no saved addresses
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-500">
                No saved addresses found.
              </p>

              <button
                type="button"
                onClick={() => navigate("/addresses/new")}
                className="mt-4 rounded-lg bg-[#0B57D0] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Add Your First Address
              </button>
            </div>
          ) : (
            addresses.map((address) => (
              <label
                key={address._id}
                className={`block cursor-pointer rounded-xl border p-5 transition ${
                  selectedAddressId === address._id
                    ? "border-[#0B57D0] bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Address selection */}
                  <input
                    type="radio"
                    name="address"
                    value={address._id}
                    checked={selectedAddressId === address._id}
                    onChange={() =>
                      setSelectedAddressId(address._id)
                    }
                    className="mt-1"
                  />

                  <div className="flex-1">
                    {/* Address label */}
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {address.label}
                      </h3>

                      {/* Default address badge */}
                      {address.isDefault && (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="mt-2">
                      {address.fullName}
                    </p>

                    <p className="text-gray-600">
                      {address.addressLine}
                    </p>

                    <p className="text-gray-600">
                      {address.city}, {address.state} -{" "}
                      {address.postalCode}
                    </p>

                    <p className="text-gray-600">
                      {address.country}
                    </p>

                    <p className="mt-1 text-gray-700">
                      Phone: {address.phone}
                    </p>
                  </div>
                </div>
              </label>
            ))
          )}
        </div>

        {/* Manage all addresses */}
        {addresses.length > 0 && (
          <button
            type="button"
            onClick={() => navigate("/addresses")}
            className="mt-4 text-sm font-semibold text-[#0B57D0] hover:underline"
          >
            Manage My Addresses →
          </button>
        )}
      </div>

      {/* -------------------------------- */}
      {/* PAYMENT METHOD */}
      {/* -------------------------------- */}

      <div className="mt-10">
        <h2 className="text-xl font-semibold">
          Payment Method
        </h2>

        <div className="mt-4 space-y-3">
          {/* COD */}
          <label
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${
              paymentMethod === "COD"
                ? "border-[#0B57D0] bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(event) =>
                setPaymentMethod(event.target.value)
              }
            />

            <div>
              <p className="font-medium">
                Cash on Delivery
              </p>

              <p className="text-sm text-gray-500">
                Pay when your order is delivered
              </p>
            </div>
          </label>

          {/* Razorpay Online Payment */}
          <label
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${
              paymentMethod === "ONLINE"
                ? "border-[#0B57D0] bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="ONLINE"
              checked={paymentMethod === "ONLINE"}
              onChange={(event) =>
                setPaymentMethod(event.target.value)
              }
            />

            <div>
              <p className="font-medium">
                Pay Online with Razorpay
              </p>

              <p className="text-sm text-gray-500">
                Pay securely using UPI, Card or Net Banking
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* PLACE ORDER */}
      {/* -------------------------------- */}

      <div className="mt-10 border-t pt-6">
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={isSubmitting || !selectedAddressId}
          className="rounded-xl bg-[#0B57D0] px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
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