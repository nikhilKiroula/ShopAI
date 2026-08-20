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

    const existingPayment = await Payment.findOne({
        order: order._id,
    });

    if (existingPayment) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        paymentId: existingPayment._id,
                        razorpayOrderId:
                            existingPayment.razorpayOrderId,
                        amount: existingPayment.amount,
                        currency: "INR",
                        keyId:
                            process.env.RAZORPAY_KEY_ID,
                    },
                    "Payment order already exists"
                )
            );
    }

    const razorpayOrder =
        await razorpay.orders.create({
            amount: Math.round(
                order.totalAmount * 100
            ),
            currency: "INR",
            receipt: order._id.toString(),
        });

    const payment = await Payment.create({
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
                    amount: order.totalAmount,
                    currency: "INR",
                    keyId:
                        process.env.RAZORPAY_KEY_ID,
                },
                "Payment order created successfully"
            )
        );
});

export {
    createPaymentOrder,
};