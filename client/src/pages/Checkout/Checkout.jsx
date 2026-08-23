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
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refreshCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get("/addresses");
        const savedAddresses = response.data.data;

        setAddresses(savedAddresses);
        setSelectedAddressId(
          savedAddresses.find((address) => address.isDefault)?._id ||
            savedAddresses[0]?._id ||
            "",
        );
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not load addresses");
      }
    };

    fetchAddresses();
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    try {
      setIsSubmitting(true);

      const orderResponse = await api.post("/orders", {
        addressId: selectedAddressId,
        paymentMethod,
      });
      const order = orderResponse.data.data;

      if (paymentMethod === "COD") {
        await refreshCart();
        toast.success("Order placed successfully. You can pay on delivery.");
        navigate("/orders");
        return;
      }

      const payment = await createPaymentOrder(order._id);
      const result = await openRazorpayCheckout(payment);

      await verifyPayment({
        razorpayOrderId: result.razorpay_order_id,
        razorpayPaymentId: result.razorpay_payment_id,
        razorpaySignature: result.razorpay_signature,
      });

      await refreshCart();
      toast.success("Payment successful and order confirmed.");
      navigate("/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Could not place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Delivery Address</h2>

        <div className="mt-4 space-y-4">
          {addresses.map((address) => (
            <label key={address._id} className="block cursor-pointer rounded-lg border p-5">
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="address"
                  value={address._id}
                  checked={selectedAddressId === address._id}
                  onChange={() => setSelectedAddressId(address._id)}
                />

                <div>
                  <h3 className="font-semibold">{address.label}</h3>
                  <p className="mt-1">{address.fullName}</p>
                  <p className="text-gray-600">{address.addressLine}</p>
                  <p className="text-gray-600">
                    {address.city}, {address.state} - {address.postalCode}
                  </p>
                  <p className="text-gray-600">{address.country}</p>
                  <p className="mt-1">Phone: {address.phone}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Payment Method</h2>

        <div className="mt-4 space-y-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
            <span>Cash on Delivery</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
            <input
              type="radio"
              name="paymentMethod"
              value="ONLINE"
              checked={paymentMethod === "ONLINE"}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
            <span>Pay Online with Razorpay</span>
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={isSubmitting}
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Processing..." : paymentMethod === "ONLINE" ? "Pay Now" : "Place Order"}
      </button>
    </section>
  );
};

export default Checkout;
