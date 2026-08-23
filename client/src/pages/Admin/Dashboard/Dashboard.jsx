import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Users, ShoppingCart, IndianRupee, Eye } from "lucide-react";
import toast from "react-hot-toast";

import api from "@/services/api.service";

// =====================================================
// Admin Dashboard
// =====================================================

const Dashboard = () => {
  // Dashboard data returned by backend.
  const [stats, setStats] = useState(null);

  // Loading state.
  const [isLoading, setIsLoading] = useState(true);

  // -------------------------------------------------
  // Fetch Dashboard Statistics
  // -------------------------------------------------

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await api.get("/admin/dashboard/stats");

        // Our ApiResponse stores data inside data.data.
        setStats(response.data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load dashboard",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  // -------------------------------------------------
  // Loading State
  // -------------------------------------------------

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  // -------------------------------------------------
  // Dashboard Statistics Cards
  // -------------------------------------------------

  const statCards = [
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      iconClass: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      iconClass: "bg-orange-100 text-orange-600",
    },
    {
      title: "Total Revenue",
      value: `₹${Number(stats?.totalRevenue || 0).toLocaleString("en-IN")}`,
      icon: IndianRupee,
      iconClass: "bg-green-100 text-green-600",
    },
  ];
  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* =========================================
                Header
            ========================================= */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your ShopAI store
        </p>
      </div>

      {/* =========================================
                Statistics Cards
            ========================================= */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    {card.value}
                  </h2>
                </div>

                {/* Card icon */}
                <div className={`rounded-lg p-3 ${card.iconClass}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================
                Order Status Overview
            ========================================= */}

      <div className="rounded-xl border bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Order Status</h2>

            <p className="mt-1 text-sm text-gray-500">
              Current order distribution
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(stats?.orderStats || {}).map(([status, count]) => {
            const statusStyles = {
              Pending: "border-yellow-200 bg-yellow-50 text-yellow-700",

              Confirmed: "border-blue-200 bg-blue-50 text-blue-700",

              Processing: "border-purple-200 bg-purple-50 text-purple-700",

              Shipped: "border-indigo-200 bg-indigo-50 text-indigo-700",

              Delivered: "border-green-200 bg-green-50 text-green-700",

              Cancelled: "border-red-200 bg-red-50 text-red-700",
            };

            return (
              <div
                key={status}
                className={`rounded-lg border p-4 ${
                  statusStyles[status] ||
                  "border-gray-200 bg-gray-50 text-gray-700"
                }`}
              >
                <p className="text-sm font-medium">{status}</p>

                <p className="mt-1 text-2xl font-bold">{count}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================
                Recent Orders
            ========================================= */}

      <div className="rounded-xl border bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Recent Orders</h2>

            <p className="mt-1 text-sm text-gray-500">
              Latest orders placed by customers
            </p>
          </div>

          {/* View all orders */}
          <Link
            to="/admin/orders"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="px-4 py-3">Customer</th>

                <th className="px-4 py-3">Amount</th>

                <th className="px-4 py-3">Payment</th>

                <th className="px-4 py-3">Status</th>

                <th className="px-4 py-3">Date</th>

                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {stats?.recentOrders?.length > 0 ? (
                stats.recentOrders.map((order) => (
                  <tr key={order._id} className="border-b last:border-b-0">
                    {/* Customer */}
                    <td className="px-4 py-4">
                      <p className="font-medium">
                        {order.user?.name || "Unknown User"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {order.user?.email || "N/A"}
                      </p>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-4 font-medium">
                      ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                    </td>

                    {/* Payment */}
                    <td className="px-4 py-4">{order.paymentStatus}</td>

                    {/* Order Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.orderStatus === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : order.orderStatus === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    {/* View Order */}
                    <td className="px-4 py-4">
                      <Link
                        to={`/admin/orders/${order._id}`}
                        className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50"
                      >
                        <Eye size={16} />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
