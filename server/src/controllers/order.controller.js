import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { Address } from "../models/address.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Create Order
const createOrder = asyncHandler(async (req, res) => {
    const { addressId } = req.body;

    if (!addressId) {
        throw new ApiError(
            400,
            "Address ID is required"
        );
    }

    const cart = await Cart.findOne({
        user: req.user._id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
        throw new ApiError(
            400,
            "Cart is empty"
        );
    }

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

    const orderItems = [];

    let subtotal = 0;

    for (const item of cart.items) {
        const product = item.product;

        if (!product) {
            throw new ApiError(
                404,
                "Product not found"
            );
        }

        if (!product.isActive) {
            throw new ApiError(
                400,
                `${product.name} is not available`
            );
        }

        if (product.stock < item.quantity) {
            throw new ApiError(
                400,
                `Insufficient stock for ${product.name}`
            );
        }

        const itemTotal =
            product.price * item.quantity;

        subtotal += itemTotal;

        orderItems.push({
            product: product._id,
            name: product.name,
            image:
                product.images?.[0]?.url || "",
            price: product.price,
            quantity: item.quantity,
        });
    }

    const shippingCharge =
        subtotal >= 1000 ? 0 : 50;

    const totalAmount =
        subtotal + shippingCharge;

    const order = await Order.create({
        user: req.user._id,

        items: orderItems,

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

        paymentStatus: "Pending",
        orderStatus: "Pending",
    });

    // Decrease stock
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

    // Clear cart
    cart.items = [];
    await cart.save();

    const populatedOrder = await Order.findById(
        order._id
    ).populate(
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


// Get My Orders
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({
        user: req.user._id,
    })
        .populate(
            "items.product",
            "name price images"
        )
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


// Get Single Order
const getOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findOne({
        _id: orderId,
        user: req.user._id,
    }).populate(
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


// Cancel Order
const cancelOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

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

    order.orderStatus = "Cancelled";

    // Restore stock
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


export {
    createOrder,
    getMyOrders,
    getOrder,
    cancelOrder,
};