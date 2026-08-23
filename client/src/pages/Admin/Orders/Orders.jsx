import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "@/services/api.service";

const Orders = () => {
  // Store all orders fetched from the backend
  const [orders, setOrders] = useState([]);

  // Track loading state while fetching orders
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all orders when the page loads
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);

        // Admin orders API
        const response = await api.get("/admin/orders");

        // ApiResponse stores actual data inside response.data.data
        setOrders(response.data.data || []);
      } catch (error) {
        // Show backend error message if available
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch orders"
        );
      } finally {
        // Stop loading after request completes
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // -------------------------------------------------
  // Loading State
  // -------------------------------------------------

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Orders
        </h1>

        <p className="mt-4 text-gray-500">
          Loading orders...
        </p>
      </div>
    );
  }

  // -------------------------------------------------
  // Orders Page
  // -------------------------------------------------

  return (
    <div className="p-6">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Orders
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage all customer orders
        </p>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold">
            No orders found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            There are no customer orders yet.
          </p>
        </div>
      ) : (
        /* Orders Table */
        <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            {/* Table Header */}
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-5 py-4 font-semibold">
                  Order ID
                </th>

                <th className="px-5 py-4 font-semibold">
                  Customer
                </th>

                <th className="px-5 py-4 font-semibold">
                  Items
                </th>

                <th className="px-5 py-4 font-semibold">
                  Amount
                </th>

                <th className="px-5 py-4 font-semibold">
                  Payment
                </th>

                <th className="px-5 py-4 font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 font-semibold">
                  Date
                </th>

                <th className="px-5 py-4 font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  {/* Order ID */}
                  <td className="px-5 py-4">
                    <span className="font-medium">
                      #{order._id.slice(-8)}
                    </span>
                  </td>

                  {/* Customer Details */}
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium">
                        {order.user?.name || "Unknown User"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {order.user?.email || "No email"}
                      </p>
                    </div>
                  </td>

                  {/* Number of Items */}
                  <td className="px-5 py-4">
                    {order.items?.length || 0}
                  </td>

                  {/* Total Amount */}
                  <td className="px-5 py-4 font-medium">
                    ₹{order.totalAmount}
                  </td>

                  {/* Payment Information */}
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium">
                        {order.paymentMethod}
                      </p>

                      <p className="text-xs text-gray-500">
                        {order.paymentStatus}
                      </p>
                    </div>
                  </td>

                  {/* Order Status */}
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* Order Date */}
                  <td className="px-5 py-4 text-gray-600">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>

                  {/* View Details */}
                  <td className="px-5 py-4">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;