import crypto from "crypto";

import razorpay from "../config/razorpay.js";

import { Order } from "../models/order.model.js";
import { Payment } from "../models/payment.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Create Razorpay Order
const createPaymentOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        throw new ApiError(
            400,
            "Order ID is required"
        );
    }

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

    if (order.orderStatus === "Cancelled") {
        throw new ApiError(
            400,
            "Cannot make payment for cancelled order"
        );
    }

    if (order.paymentStatus === "Paid") {
        throw new ApiError(
            400,
            "Order is already paid"
        );
    }

    if (order.paymentMethod !== "ONLINE") {
        throw new ApiError(
            400,
            "Razorpay payment is only available for ONLINE orders"
        );
    }

    const existingPayment = await Payment.findOne({
        order: order._id,
    });

    if (existingPayment && existingPayment.status !== "Failed") {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        paymentId: existingPayment._id,
                        razorpayOrderId:
                            existingPayment.razorpayOrderId,
                        // Razorpay Checkout expects the amount in paise.
                        amount: Math.round(existingPayment.amount * 100),
                        currency: "INR",
                        keyId:
                            process.env.RAZORPAY_KEY_ID,
                    },
                    "Payment order already exists"
                )
            );
    }

    const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(order.totalAmount * 100),
        currency: "INR",
        receipt: order._id.toString(),
    });

    // A failed signature must get a fresh Razorpay order before retrying.
    const payment = existingPayment
        ? await Payment.findByIdAndUpdate(
            existingPayment._id,
            {
                razorpayOrderId: razorpayOrder.id,
                razorpayPaymentId: null,
                razorpaySignature: null,
                amount: order.totalAmount,
                status: "Created",
            },
            { new: true }
        )
        : await Payment.create({
            user: req.user._id,
            order: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: order.totalAmount,
            status: "Created",
        });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {
                    paymentId: payment._id,
                    razorpayOrderId:
                        razorpayOrder.id,
                    amount: razorpayOrder.amount,
                    currency: "INR",
                    keyId:
                        process.env.RAZORPAY_KEY_ID,
                },
                "Payment order created successfully"
            )
        );
});

const verifyPayment = asyncHandler(async (req, res) => {
    const {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
    } = req.body;

    if (
        !razorpayOrderId ||
        !razorpayPaymentId ||
        !razorpaySignature
    ) {
        throw new ApiError(
            400,
            "Payment verification details are required"
        );
    }

    const payment = await Payment.findOne({
        razorpayOrderId,
        user: req.user._id,
    });

    if (!payment) {
        throw new ApiError(
            404,
            "Payment record not found"
        );
    }

    if (payment.status === "Paid") {
        const order = await Order.findOne({
            _id: payment.order,
            user: req.user._id,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                { payment, order },
                "Payment is already verified"
            )
        );
    }

    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
        )
        .update(
            `${razorpayOrderId}|${razorpayPaymentId}`
        )
        .digest("hex");

    if (
        generatedSignature !== razorpaySignature
    ) {
        payment.status = "Failed";
        await payment.save();

        throw new ApiError(
            400,
            "Invalid payment signature"
        );
    }

    payment.razorpayPaymentId =
        razorpayPaymentId;

    payment.razorpaySignature =
        razorpaySignature;

    payment.status = "Paid";

    await payment.save();

    const order = await Order.findOne({
        _id: payment.order,
        user: req.user._id,
    });

    if (!order) {
        throw new ApiError(
            404,
            "Order not found"
        );
    }

    order.paymentStatus = "Paid";
    order.paymentId = razorpayPaymentId;
    order.paidAt = new Date();
    order.orderStatus = "Confirmed";

    await order.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    payment,
                    order,
                },
                "Payment verified successfully"
            )
        );
});

export {
    createPaymentOrder,
    verifyPayment,
};
