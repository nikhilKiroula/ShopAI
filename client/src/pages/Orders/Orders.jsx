import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "@/services/api.service";

const Orders = () => {
  // Store user's orders
  const [orders, setOrders] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Track which order is currently being cancelled
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const navigate = useNavigate();

  // Fetch logged-in user's orders
  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");

      setOrders(response.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch orders",
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when page loads
  useEffect(() => {
    fetchOrders();
  }, []);

  // Cancel an order
  const handleCancelOrder = async (orderId) => {
    try {
      setCancellingOrderId(orderId);

      await api.patch(`/orders/${orderId}/cancel`);

      toast.success("Order cancelled successfully");

      // Refresh order list
      await fetchOrders();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to cancel order",
      );
    } finally {
      setCancellingOrderId(null);
    }
  };

  // Show loading spinner
  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0B57D0] border-t-transparent" />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Orders
        </h1>

        <p className="mt-1 text-gray-500">
          View and manage your orders
        </p>
      </div>

      {/* Empty Orders */}
      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No orders yet
          </h2>

          <p className="mt-2 text-gray-500">
            Your placed orders will appear here.
          </p>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-5 rounded-lg bg-[#0B57D0] px-5 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        /* Orders List */
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* Order Header */}
              <div className="flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="font-semibold text-gray-900">
                    #{order._id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Order Date
                  </p>

                  <p className="font-medium">
                    {new Date(
                      order.createdAt,
                    ).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <p className="font-bold">
                    ₹
                    {order.totalAmount?.toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>
              </div>

              {/* Status Section */}
              <div className="flex flex-wrap gap-3 py-4">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  Order: {order.orderStatus}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                  Payment: {order.paymentStatus}
                </span>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div
                    key={`${order._id}-${index}`}
                    className="flex items-center gap-4"
                  >
                    {/* Product Image */}
                    <img
                      src={
                        item.image ||
                        item.product?.images?.[0]?.url ||
                        ""
                      }
                      alt={item.name}
                      className="h-20 w-20 rounded-lg border object-contain"
                    />

                    {/* Product Information */}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        ₹{item.price?.toLocaleString("en-IN")} ×{" "}
                        {item.quantity}
                      </p>
                    </div>

                    {/* Item Total */}
                    <p className="font-semibold">
                      ₹
                      {(
                        item.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="mt-6 flex flex-wrap gap-3 border-t pt-5">
                {/* View Details */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/orders/${order._id}`)
                  }
                  className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  View Details
                </button>

                {/* Cancel Order */}
                {["Pending", "Confirmed", "Processing"].includes(
                  order.orderStatus,
                ) && (
                  <button
                    type="button"
                    disabled={
                      cancellingOrderId === order._id
                    }
                    onClick={() =>
                      handleCancelOrder(order._id)
                    }
                    className="rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {cancellingOrderId === order._id
                      ? "Cancelling..."
                      : "Cancel Order"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Orders;