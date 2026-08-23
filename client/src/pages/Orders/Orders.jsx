import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { cancelOrder, getMyOrders } from "@/services/order.service";
import {
  createPaymentOrder,
  openRazorpayCheckout,
  verifyPayment,
} from "@/services/payment.service";

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Processing: "bg-violet-100 text-violet-800",
  Shipped: "bg-indigo-100 text-indigo-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Paid: "bg-green-100 text-green-800",
  Refunded: "bg-purple-100 text-purple-800",
};

const StatusBadge = ({ status }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${
      statusStyles[status] || "bg-gray-100 text-gray-800"
    }`}
  >
    {status}
  </span>
);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeOrderId, setActiveOrderId] = useState("");

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setOrders(await getMyOrders());
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Cancel this order? Stock will be restored.")) return;

    try {
      setActiveOrderId(orderId);
      const cancelledOrder = await cancelOrder(orderId);
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId ? cancelledOrder : order,
        ),
      );
      toast.success("Order cancelled successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not cancel order");
    } finally {
      setActiveOrderId("");
    }
  };

  const handlePayNow = async (orderId) => {
    try {
      setActiveOrderId(orderId);
      const payment = await createPaymentOrder(orderId);
      const result = await openRazorpayCheckout(payment);

      await verifyPayment({
        razorpayOrderId: result.razorpay_order_id,
        razorpayPaymentId: result.razorpay_payment_id,
        razorpaySignature: result.razorpay_signature,
      });

      toast.success("Payment successful and order confirmed.");
      await fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Payment could not be completed");
    } finally {
      setActiveOrderId("");
    }
  };

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0B57D0] border-t-transparent" />
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">No orders yet</h1>
          <p className="mt-3 text-gray-500">Your placed orders will appear here.</p>
          <Link
            to="/products"
            className="mt-6 inline-block rounded-lg bg-[#0B57D0] px-5 py-3 font-semibold text-white"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="mt-1 text-gray-500">{orders.length} order{orders.length === 1 ? "" : "s"}</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const canCancel =
            !["Shipped", "Delivered", "Cancelled"].includes(order.orderStatus) &&
            !(order.paymentMethod === "ONLINE" && order.paymentStatus === "Paid");
          const canPay =
            order.paymentMethod === "ONLINE" &&
            order.paymentStatus === "Pending" &&
            order.orderStatus !== "Cancelled";
          const isActive = activeOrderId === order._id;

          return (
            <article key={order._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="mt-1 font-medium">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={order.orderStatus} />
                  <StatusBadge status={order.paymentStatus} />
                </div>
              </div>

              <div className="space-y-4 p-5">
                {order.items.map((item) => (
                  <div key={item.product?._id || item.product} className="flex items-center gap-4">
                    <img
                      src={item.image || item.product?.images?.[0]?.url || ""}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg bg-gray-50 object-contain"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{Number(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 border-t border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online payment"}
                  </p>
                  <p className="mt-1 text-xl font-bold">₹{Number(order.totalAmount).toLocaleString("en-IN")}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {canPay && (
                    <button
                      type="button"
                      disabled={isActive}
                      onClick={() => handlePayNow(order._id)}
                      className="rounded-lg bg-[#0B57D0] px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isActive ? "Processing..." : "Pay Now"}
                    </button>
                  )}

                  {canCancel && (
                    <button
                      type="button"
                      disabled={isActive}
                      onClick={() => handleCancel(order._id)}
                      className="rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isActive ? "Processing..." : "Cancel Order"}
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Orders;
