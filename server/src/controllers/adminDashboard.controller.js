import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// =====================================================
// Get Admin Dashboard Statistics
// =====================================================

const getDashboardStats = asyncHandler(async (req, res) => {
    // -------------------------------------------------
    // 1. Get total products
    // -------------------------------------------------

    // Count only active products because inactive products
    // should not normally be considered available products.
    const totalProducts = await Product.countDocuments({
        isActive: true,
    });

    // -------------------------------------------------
    // 2. Get total users
    // -------------------------------------------------

    // Count all registered users.
    const totalUsers = await User.countDocuments();

    // -------------------------------------------------
    // 3. Get total orders
    // -------------------------------------------------

    const totalOrders = await Order.countDocuments();

    // -------------------------------------------------
    // 4. Calculate total revenue
    // -------------------------------------------------

    // Revenue should only include successfully paid orders.
    //
    // Cancelled/refunded orders should not contribute to
    // the final revenue amount.
    const revenueResult = await Order.aggregate([
        {
            $match: {
                paymentStatus: "Paid",
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$totalAmount",
                },
            },
        },
    ]);

    // If there are no paid orders, revenue will be 0.
    const totalRevenue =
        revenueResult[0]?.totalRevenue || 0;

    // -------------------------------------------------
    // 5. Get order status statistics
    // -------------------------------------------------

    // Group orders according to their current status.
    const orderStatsResult = await Order.aggregate([
        {
            $group: {
                _id: "$orderStatus",
                count: {
                    $sum: 1,
                },
            },
        },
    ]);

    // Convert aggregation result into an easier object
    // for frontend consumption.
    const orderStats = {
        Pending: 0,
        Confirmed: 0,
        Processing: 0,
        Shipped: 0,
        Delivered: 0,
        Cancelled: 0,
    };

    orderStatsResult.forEach((item) => {
        if (orderStats[item._id] !== undefined) {
            orderStats[item._id] = item.count;
        }
    });

    // -------------------------------------------------
    // 6. Get recent orders
    // -------------------------------------------------

    // Fetch the latest 5 orders for the dashboard.
    const recentOrders = await Order.find()
        .populate("user", "name email")
        .select(
            "user totalAmount paymentStatus orderStatus createdAt"
        )
        .sort({
            createdAt: -1,
        })
        .limit(5);

    // -------------------------------------------------
    // 7. Send dashboard response
    // -------------------------------------------------

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    totalProducts,
                    totalUsers,
                    totalOrders,
                    totalRevenue,
                    orderStats,
                    recentOrders,
                },
                "Dashboard statistics fetched successfully"
            )
        );
});

export {
    getDashboardStats,
};