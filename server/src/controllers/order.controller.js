import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { Address } from "../models/address.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// =====================================================
// Create New Order
// =====================================================

const createOrder = asyncHandler(async (req, res) => {
    const { addressId, paymentMethod } = req.body;

    // Check whether address ID is provided
    if (!addressId) {
        throw new ApiError(
            400,
            "Address ID is required"
        );
    }

    if (!['COD', 'ONLINE'].includes(paymentMethod)) {
        throw new ApiError(
            400,
            "Payment method must be COD or ONLINE"
        );
    }

    // -------------------------------------------------
    // 1. Get user's cart
    // -------------------------------------------------

    const cart = await Cart.findOne({
        user: req.user._id,
    }).populate("items.product");

    // Check whether cart exists and contains products
    if (!cart || cart.items.length === 0) {
        throw new ApiError(
            400,
            "Cart is empty"
        );
    }

    // -------------------------------------------------
    // 2. Get user's selected address
    // -------------------------------------------------

    // We also check the user here so that one user
    // cannot use another user's address.
    const address = await Address.findOne({
        _id: addressId,
        user: req.user._id,
    });

    if (!address) {
        throw new ApiError(
            404,
            "Address not found"
        );
    }

    // -------------------------------------------------
    // 3. Prepare order items and calculate subtotal
    // -------------------------------------------------

    const orderItems = [];
    let subtotal = 0;

    for (const item of cart.items) {
        const product = item.product;

        // Product may have been deleted after
        // being added to the cart.
        if (!product) {
            throw new ApiError(
                404,
                "Product not found"
            );
        }

        // Inactive products cannot be ordered
        if (!product.isActive) {
            throw new ApiError(
                400,
                `${product.name} is not available`
            );
        }

        // Check whether enough stock is available
        if (product.stock < item.quantity) {
            throw new ApiError(
                400,
                `Insufficient stock for ${product.name}`
            );
        }

        // Calculate total price for this cart item
        const itemTotal =
            product.price * item.quantity;

        subtotal += itemTotal;

        // Save a snapshot of product information
        // inside the order.
        orderItems.push({
            product: product._id,
            name: product.name,
            image: product.images?.[0]?.url || "",
            price: product.price,
            quantity: item.quantity,
        });
    }

    // -------------------------------------------------
    // 4. Calculate shipping charges
    // -------------------------------------------------

    // Free shipping for orders of ₹1000 or more
    const shippingCharge =
        subtotal >= 1000 ? 0 : 50;

    // Final amount customer needs to pay
    const totalAmount =
        subtotal + shippingCharge;

    // -------------------------------------------------
    // 5. Create order
    // -------------------------------------------------

    const order = await Order.create({
        user: req.user._id,

        items: orderItems,

        // Store address snapshot inside order.
        // Even if the user changes their address later,
        // the old order should keep the original address.
        shippingAddress: {
            fullName: address.fullName,
            phone: address.phone,
            addressLine: address.addressLine,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
        },

        subtotal,
        shippingCharge,
        totalAmount,

        // COD orders remain pending until delivery. Online orders
        // are marked paid only after Razorpay signature verification.
        paymentMethod,
        paymentStatus: "Pending",

        // New order starts with Pending status.
        orderStatus: "Pending",
    });

    // -------------------------------------------------
    // 6. Decrease product stock
    // -------------------------------------------------

    for (const item of cart.items) {
        await Product.findByIdAndUpdate(
            item.product._id,
            {
                $inc: {
                    stock: -item.quantity,
                },
            }
        );
    }

    // -------------------------------------------------
    // 7. Clear user's cart
    // -------------------------------------------------

    cart.items = [];

    await cart.save();

    // -------------------------------------------------
    // 8. Return created order
    // -------------------------------------------------

    const populatedOrder =
        await Order.findById(order._id)
            .populate(
                "items.product",
                "name price images"
            );

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                populatedOrder,
                "Order created successfully"
            )
        );
});

// =====================================================
// Get My Orders
// =====================================================

const getMyOrders = asyncHandler(async (req, res) => {
    // Fetch only the orders that belong to the
    // currently authenticated user.
    const orders = await Order.find({
        user: req.user._id,
    })
        // Populate product details for each order item.
        .populate(
            "items.product",
            "name price images"
        )

        // Show newest orders first.
        .sort({
            createdAt: -1,
        });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                orders,
                "Orders fetched successfully"
            )
        );
});


// =====================================================
// Get Single Order
// =====================================================

const getOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    // Find the order using both order ID and user ID.
    //
    // This is important because a user should not be
    // able to access another user's order by changing
    // the order ID in the URL.
    const order = await Order.findOne({
        _id: orderId,
        user: req.user._id,
    }).populate(
        "items.product",
        "name price images"
    );

    // If order doesn't exist or doesn't belong
    // to the current user, return 404.
    if (!order) {
        throw new ApiError(
            404,
            "Order not found"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                order,
                "Order fetched successfully"
            )
        );
});


// =====================================================
// Cancel Order
// =====================================================

const cancelOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    // Find only the order belonging to the
    // currently authenticated user.
    const order = await Order.findOne({
        _id: orderId,
        user: req.user._id,
    });

    if (!order) {
        throw new ApiError(
            404,
            "Order not found"
        );
    }

    // -------------------------------------------------
    // Check whether the order can be cancelled
    // -------------------------------------------------

    // Once the order is shipped or delivered,
    // the customer cannot cancel it.
    //
    // A cancelled order also cannot be cancelled again.
    if (
        order.orderStatus === "Shipped" ||
        order.orderStatus === "Delivered" ||
        order.orderStatus === "Cancelled"
    ) {
        throw new ApiError(
            400,
            "Order cannot be cancelled"
        );
    }

    // Do not cancel a successful online payment until a real
    // Razorpay refund flow exists. This prevents an order from
    // looking refunded in the database when no money was returned.
    if (
        order.paymentMethod === "ONLINE" &&
        order.paymentStatus === "Paid"
    ) {
        throw new ApiError(
            400,
            "Paid online orders require a payment gateway refund"
        );
    }

    // -------------------------------------------------
    // Update order status
    // -------------------------------------------------

    order.orderStatus = "Cancelled";

    // -------------------------------------------------
    // Restore product stock
    // -------------------------------------------------

    // When the order was created, stock was decreased.
    // If the customer cancels the order, we add that
    // quantity back to the product stock.
    for (const item of order.items) {
        await Product.findByIdAndUpdate(
            item.product,
            {
                $inc: {
                    stock: item.quantity,
                },
            }
        );
    }

    // Save the updated order.
    await order.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                order,
                "Order cancelled successfully"
            )
        );
});


// Get all orders for admin
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate("user", "name email")
        .populate(
            "items.product",
            "name price images"
        )
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                orders,
                "All orders fetched successfully"
            )
        );
});

// Get single order for admin
const getAdminOrderById = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
        .populate("user", "name email")
        .populate(
            "items.product",
            "name price images"
        );

    if (!order) {
        throw new ApiError(
            404,
            "Order not found"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                order,
                "Order fetched successfully"
            )
        );
});


// Update order status for admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    // Define all valid order statuses
    const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];

    // Validate the new status
    if (!allowedStatuses.includes(orderStatus)) {
        throw new ApiError(
            400,
            "Invalid order status"
        );
    }

    // Find the order
    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(
            404,
            "Order not found"
        );
    }

    const currentStatus = order.orderStatus;

    // Prevent changes to completed or cancelled orders
    if (currentStatus === "Delivered") {
        throw new ApiError(
            400,
            "Delivered order cannot be updated"
        );
    }

    if (currentStatus === "Cancelled") {
        throw new ApiError(
            400,
            "Cancelled order cannot be updated"
        );
    }

    // Define valid status transitions
    const allowedTransitions = {
        Pending: ["Confirmed", "Cancelled"],
        Confirmed: ["Processing", "Cancelled"],
        Processing: ["Shipped", "Cancelled"],
        Shipped: ["Delivered"],
    };

    // Check whether the requested transition is valid
    if (
        !allowedTransitions[currentStatus]?.includes(
            orderStatus
        )
    ) {
        throw new ApiError(
            400,
            `Order cannot move from ${currentStatus} to ${orderStatus}`
        );
    }

    // Restore stock when an order is cancelled
    if (orderStatus === "Cancelled") {
        for (const item of order.items) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: item.quantity,
                    },
                }
            );
        }
    }

    // Update the order status
    order.orderStatus = orderStatus;

    // Save the updated order
    await order.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                order,
                "Order status updated successfully"
            )
        );
});


// Process a refund for a paid cancelled order
const refundOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    // Find the order
    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(
            404,
            "Order not found"
        );
    }

    // Refund is only possible for cancelled orders
    if (order.orderStatus !== "Cancelled") {
        throw new ApiError(
            400,
            "Only cancelled orders can be refunded"
        );
    }

    // Prevent refunding the same order twice
    if (order.paymentStatus === "Refunded") {
        throw new ApiError(
            400,
            "Order has already been refunded"
        );
    }

    // There is nothing to refund if payment was never completed
    if (order.paymentStatus !== "Paid") {
        throw new ApiError(
            400,
            "Order is not eligible for refund"
        );
    }

    /*
     * Actual payment gateway refund will be implemented here.
     *
     * Example:
     * await stripe.refunds.create({
     *     payment_intent: order.paymentId,
     * });
     */

    // Mark payment as refunded after successful refund
    order.paymentStatus = "Refunded";

    await order.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                order,
                "Order refunded successfully"
            )
        );
});


export {
    createOrder,
    getMyOrders,
    getOrder,
    cancelOrder,
    getAllOrders,
    getAdminOrderById,
    updateOrderStatus,
    refundOrder,
};
