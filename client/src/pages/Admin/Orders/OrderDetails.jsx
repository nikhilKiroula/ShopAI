import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
    ArrowLeft,
    Package,
    User,
    MapPin,
    CreditCard,
} from "lucide-react";

import api from "@/services/api.service";

// =====================================================
// Admin Order Details
// =====================================================

const OrderDetails = () => {
    // Get order ID from URL.
    const { orderId } = useParams();

    const navigate = useNavigate();

    // Store the order returned by backend.
    const [order, setOrder] = useState(null);

    // Loading state for initial order fetch.
    const [isLoading, setIsLoading] = useState(true);

    // Loading state for status update.
    const [isUpdating, setIsUpdating] = useState(false);

    // Selected status in dropdown.
    const [selectedStatus, setSelectedStatus] = useState("");

    // -------------------------------------------------
    // Fetch Order Details
    // -------------------------------------------------

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get(
                    `/admin/orders/${orderId}`
                );

                const orderData = response.data.data;

                setOrder(orderData);
                setSelectedStatus(orderData.orderStatus);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                        "Failed to load order"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    // -------------------------------------------------
    // Update Order Status
    // -------------------------------------------------

    const handleStatusUpdate = async () => {
        if (!selectedStatus || selectedStatus === order.orderStatus) {
            return;
        }

        try {
            setIsUpdating(true);

            const response = await api.patch(
                `/admin/orders/${orderId}/status`,
                {
                    orderStatus: selectedStatus,
                }
            );

            // Update local order with backend response.
            setOrder(response.data.data);

            toast.success("Order status updated successfully");
        } catch (error) {
            // If transition is invalid, backend will return
            // an appropriate error message.
            toast.error(
                error.response?.data?.message ||
                    "Failed to update order status"
            );

            // Restore dropdown to current order status.
            setSelectedStatus(order.orderStatus);
        } finally {
            setIsUpdating(false);
        }
    };

    // -------------------------------------------------
    // Loading State
    // -------------------------------------------------

    if (isLoading) {
        return (
            <div className="p-6">
                <p className="text-gray-500">
                    Loading order details...
                </p>
            </div>
        );
    }

    // -------------------------------------------------
    // Order Not Found
    // -------------------------------------------------

    if (!order) {
        return (
            <div className="p-6">
                <p className="text-gray-600">
                    Order not found.
                </p>

                <button
                    onClick={() => navigate("/admin/orders")}
                    className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                >
                    Back to Orders
                </button>
            </div>
        );
    }

    // -------------------------------------------------
    // Allowed Statuses
    // -------------------------------------------------

    const statuses = [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];

    return (
        <div className="space-y-6 p-4 sm:p-6">
            {/* =================================================
                Header
            ================================================= */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Link
                        to="/admin/orders"
                        className="mb-3 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft size={16} />
                        Back to Orders
                    </Link>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Order Details
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Order ID: {order._id}
                    </p>
                </div>

                {/* Current order status */}
                <span
                    className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-medium ${
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
            </div>

            {/* =================================================
                Customer + Shipping Information
            ================================================= */}

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Customer Information */}

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <User size={20} />

                        <h2 className="text-lg font-semibold">
                            Customer
                        </h2>
                    </div>

                    <div className="space-y-2 text-sm">
                        <p>
                            <span className="text-gray-500">
                                Name:
                            </span>{" "}
                            {order.user?.name || "N/A"}
                        </p>

                        <p>
                            <span className="text-gray-500">
                                Email:
                            </span>{" "}
                            {order.user?.email || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Shipping Address */}

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <MapPin size={20} />

                        <h2 className="text-lg font-semibold">
                            Shipping Address
                        </h2>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                        <p className="font-medium text-gray-900">
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
                            Phone:{" "}
                            {order.shippingAddress?.phone}
                        </p>
                    </div>
                </div>
            </div>

            {/* =================================================
                Order Items
            ================================================= */}

            <div className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center gap-2">
                    <Package size={20} />

                    <h2 className="text-lg font-semibold">
                        Order Items
                    </h2>
                </div>

                <div className="space-y-4">
                    {order.items.map((item) => (
                        <div
                            key={item._id || item.product?._id}
                            className="flex flex-col gap-4 border-b pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-center"
                        >
                            {/* Product Image */}

                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-gray-50">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : item.product?.images?.[0]?.url ? (
                                    <img
                                        src={
                                            item.product
                                                .images[0].url
                                        }
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <Package
                                            size={24}
                                            className="text-gray-400"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Product Information */}

                            <div className="flex-1">
                                <h3 className="font-medium">
                                    {item.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    ₹
                                    {Number(
                                        item.price
                                    ).toLocaleString(
                                        "en-IN"
                                    )}{" "}
                                    × {item.quantity}
                                </p>
                            </div>

                            {/* Item Total */}

                            <p className="font-semibold">
                                ₹
                                {(
                                    item.price *
                                    item.quantity
                                ).toLocaleString("en-IN")}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* =================================================
                Payment + Order Summary
            ================================================= */}

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Payment Information */}

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <CreditCard size={20} />

                        <h2 className="text-lg font-semibold">
                            Payment
                        </h2>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">
                                Method
                            </span>

                            <span className="font-medium">
                                {order.paymentMethod}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">
                                Status
                            </span>

                            <span className="font-medium">
                                {order.paymentStatus}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">
                        Order Summary
                    </h2>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">
                                Subtotal
                            </span>

                            <span>
                                ₹
                                {Number(
                                    order.subtotal
                                ).toLocaleString("en-IN")}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">
                                Shipping
                            </span>

                            <span>
                                ₹
                                {Number(
                                    order.shippingCharge
                                ).toLocaleString("en-IN")}
                            </span>
                        </div>

                        <div className="border-t pt-3">
                            <div className="flex justify-between text-base font-bold">
                                <span>Total</span>

                                <span>
                                    ₹
                                    {Number(
                                        order.totalAmount
                                    ).toLocaleString(
                                        "en-IN"
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =================================================
                Update Order Status
            ================================================= */}

            <div className="rounded-xl border bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold">
                    Update Order Status
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Move the order through the allowed status
                    flow.
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <select
                        value={selectedStatus}
                        onChange={(event) =>
                            setSelectedStatus(
                                event.target.value
                            )
                        }
                        disabled={
                            order.orderStatus ===
                                "Delivered" ||
                            order.orderStatus ===
                                "Cancelled" ||
                            isUpdating
                        }
                        className="rounded-lg border px-4 py-3 outline-none focus:border-gray-500"
                    >
                        {statuses.map((status) => (
                            <option
                                key={status}
                                value={status}
                            >
                                {status}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={handleStatusUpdate}
                        disabled={
                            isUpdating ||
                            selectedStatus ===
                                order.orderStatus ||
                            order.orderStatus ===
                                "Delivered" ||
                            order.orderStatus ===
                                "Cancelled"
                        }
                        className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isUpdating
                            ? "Updating..."
                            : "Update Status"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;