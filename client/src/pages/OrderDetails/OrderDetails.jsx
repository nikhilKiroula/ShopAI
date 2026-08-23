import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "@/services/api.service";

const OrderDetails = () => {
  // Get order ID from URL
  const { orderId } = useParams();

  const navigate = useNavigate();

  // Store order details
  const [order, setOrder] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Cancel loading state
  const [cancelling, setCancelling] = useState(false);

  // Fetch single order
  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${orderId}`);

      setOrder(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch order",
      );

      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch order when page loads
  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  // Cancel order
  const handleCancelOrder = async () => {
    try {
      setCancelling(true);

      await api.patch(`/orders/${orderId}/cancel`);

      toast.success("Order cancelled successfully");

      // Fetch updated order status
      await fetchOrder();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to cancel order",
      );
    } finally {
      setCancelling(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0B57D0] border-t-transparent" />
      </section>
    );
  }

  // If order wasn't found
  if (!order) {
    return null;
  }

  // Order statuses for timeline
  const orderSteps = [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  // Find current status position
  const currentStep = orderSteps.indexOf(order.orderStatus);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate("/orders")}
        className="mb-6 text-sm font-semibold text-[#0B57D0] hover:underline"
      >
        ← Back to My Orders
      </button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Order Details
        </h1>

        <p className="mt-1 text-gray-500">
          Order ID: #{order._id}
        </p>
      </div>

      {/* Order Status */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-sm text-gray-500">
              Order Status
            </p>

            <p className="mt-1 text-lg font-semibold">
              {order.orderStatus}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Payment Status
            </p>

            <p className="mt-1 text-lg font-semibold">
              {order.paymentStatus}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Ordered On
            </p>

            <p className="mt-1 font-medium">
              {new Date(
                order.createdAt,
              ).toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>

        {/* Cancelled order message */}
        {order.orderStatus === "Cancelled" && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            This order has been cancelled.
          </div>
        )}

        {/* Order Timeline */}
        {order.orderStatus !== "Cancelled" && (
          <div className="mt-8">
            <h2 className="mb-5 font-semibold">
              Order Progress
            </h2>

            <div className="flex flex-wrap gap-3">
              {orderSteps.map((step, index) => {
                const completed =
                  currentStep >= index;

                return (
                  <div
                    key={step}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                        completed
                          ? "bg-[#0B57D0] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <span
                      className={
                        completed
                          ? "font-medium text-gray-900"
                          : "text-gray-400"
                      }
                    >
                      {step}
                    </span>

                    {index < orderSteps.length - 1 && (
                      <span className="mx-1 text-gray-300">
                        →
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Products */}
      <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          Items
        </h2>

        <div className="mt-5 divide-y">
          {order.items?.map((item, index) => (
            <div
              key={`${item.product?._id || item.product}-${index}`}
              className="flex gap-4 py-5"
            >
              {/* Product Image */}
              <img
                src={
                  item.image ||
                  item.product?.images?.[0]?.url ||
                  ""
                }
                alt={item.name}
                className="h-24 w-24 rounded-lg border object-contain"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  ₹{item.price?.toLocaleString("en-IN")} ×{" "}
                  {item.quantity}
                </p>

                <p className="mt-2 font-semibold">
                  ₹
                  {(
                    item.price * item.quantity
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address + Price Summary */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Shipping Address */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Delivery Address
          </h2>

          <div className="mt-4 space-y-1 text-gray-600">
            <p className="font-semibold text-gray-900">
              {order.shippingAddress?.fullName}
            </p>

            <p>
              {order.shippingAddress?.addressLine}
            </p>

            <p>
              {order.shippingAddress?.city},{" "}
              {order.shippingAddress?.state} -{" "}
              {order.shippingAddress?.postalCode}
            </p>

            <p>
              {order.shippingAddress?.country}
            </p>

            <p>
              Phone: {order.shippingAddress?.phone}
            </p>
          </div>
        </div>

        {/* Price Summary */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Price Details
          </h2>

          <div className="mt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Subtotal
              </span>

              <span>
                ₹
                {order.subtotal?.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Shipping
              </span>

              <span>
                {order.shippingCharge === 0
                  ? "FREE"
                  : `₹${order.shippingCharge}`}
              </span>
            </div>

            <div className="flex justify-between border-t pt-3 text-lg font-bold">
              <span>Total</span>

              <span>
                ₹
                {order.totalAmount?.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      {["Pending", "Confirmed", "Processing"].includes(
        order.orderStatus,
      ) && (
        <div className="mt-6">
          <button
            type="button"
            onClick={handleCancelOrder}
            disabled={cancelling}
            className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cancelling
              ? "Cancelling..."
              : "Cancel Order"}
          </button>
        </div>
      )}
    </section>
  );
};

export default OrderDetails;