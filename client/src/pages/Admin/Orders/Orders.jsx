import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "@/services/api.service";

const Orders = () => {
    // Store all orders fetched from backend
    const [orders, setOrders] = useState([]);

    // Loading state while fetching orders
    const [isLoading, setIsLoading] = useState(true);

    // Store currently updating order ID
    const [updatingOrderId, setUpdatingOrderId] = useState(null);

    // -------------------------------------------------
    // Fetch all orders
    // -------------------------------------------------

    const fetchOrders = async () => {
        try {
            setIsLoading(true);

            const response = await api.get("/admin/orders");

            // ApiResponse data is available inside response.data.data
            setOrders(response.data.data);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load orders"
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch orders when page loads
    useEffect(() => {
        fetchOrders();
    }, []);

    // -------------------------------------------------
    // Update Order Status
    // -------------------------------------------------

    const handleStatusChange = async (
        orderId,
        newStatus
    ) => {
        try {
            setUpdatingOrderId(orderId);

            const response = await api.patch(
                `/admin/orders/${orderId}/status`,
                {
                    orderStatus: newStatus,
                }
            );

            const updatedOrder = response.data.data;

            // Update only the changed order in local state
            setOrders((previousOrders) =>
                previousOrders.map((order) =>
                    order._id === updatedOrder._id
                        ? {
                              ...order,
                              orderStatus:
                                  updatedOrder.orderStatus,
                          }
                        : order
                )
            );

            toast.success(
                "Order status updated successfully"
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update order status"
            );
        } finally {
            setUpdatingOrderId(null);
        }
    };

    // -------------------------------------------------
    // Loading UI
    // -------------------------------------------------

    if (isLoading) {
        return (
            <div className="p-6">
                <p className="text-gray-500">
                    Loading orders...
                </p>
            </div>
        );
    }

    return (
        <section className="p-6">

            {/* Page heading */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                    Orders
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage customer orders and update
                    their status.
                </p>
            </div>

            {/* Empty state */}
            {orders.length === 0 ? (
                <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
                    <h2 className="text-lg font-semibold">
                        No orders found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Customer orders will appear here.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

                    {/* Responsive table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">

                            {/* Table header */}
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="px-5 py-4 text-left font-semibold">
                                        Order
                                    </th>

                                    <th className="px-5 py-4 text-left font-semibold">
                                        Customer
                                    </th>

                                    <th className="px-5 py-4 text-left font-semibold">
                                        Items
                                    </th>

                                    <th className="px-5 py-4 text-left font-semibold">
                                        Amount
                                    </th>

                                    <th className="px-5 py-4 text-left font-semibold">
                                        Payment
                                    </th>

                                    <th className="px-5 py-4 text-left font-semibold">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-left font-semibold">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            {/* Table body */}
                            <tbody className="divide-y">

                                {orders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="hover:bg-gray-50"
                                    >

                                        {/* Order ID */}
                                        <td className="px-5 py-4">
                                            <p className="font-medium">
                                                #{order._id.slice(-8)}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </td>

                                        {/* Customer */}
                                        <td className="px-5 py-4">
                                            <p className="font-medium">
                                                {order.user?.name ||
                                                    "Unknown"}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                {order.user?.email ||
                                                    "No email"}
                                            </p>
                                        </td>

                                        {/* Number of items */}
                                        <td className="px-5 py-4">
                                            {order.items?.length || 0}
                                        </td>

                                        {/* Total amount */}
                                        <td className="px-5 py-4 font-semibold">
                                            ₹
                                            {order.totalAmount?.toLocaleString(
                                                "en-IN"
                                            )}
                                        </td>

                                        {/* Payment information */}
                                        <td className="px-5 py-4">
                                            <p className="font-medium">
                                                {order.paymentMethod}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                {order.paymentStatus}
                                            </p>
                                        </td>

                                        {/* Status dropdown */}
                                        <td className="px-5 py-4">

                                            <select
                                                value={
                                                    order.orderStatus
                                                }
                                                disabled={
                                                    updatingOrderId ===
                                                        order._id ||
                                                    order.orderStatus ===
                                                        "Delivered" ||
                                                    order.orderStatus ===
                                                        "Cancelled"
                                                }
                                                onChange={(event) =>
                                                    handleStatusChange(
                                                        order._id,
                                                        event.target
                                                            .value
                                                    )
                                                }
                                                className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>

                                                <option value="Confirmed">
                                                    Confirmed
                                                </option>

                                                <option value="Processing">
                                                    Processing
                                                </option>

                                                <option value="Shipped">
                                                    Shipped
                                                </option>

                                                <option value="Delivered">
                                                    Delivered
                                                </option>

                                                <option value="Cancelled">
                                                    Cancelled
                                                </option>
                                            </select>

                                            {updatingOrderId ===
                                                order._id && (
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Updating...
                                                </p>
                                            )}
                                        </td>

                                        {/* View order */}
                                        <td className="px-5 py-4">
                                            <Link
                                                to={`/admin/orders/${order._id}`}
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                View
                                            </Link>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Orders;