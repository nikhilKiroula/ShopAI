import mongoose, { mongo, Schema } from "mongoose";

const paymentSchema = new Schema(
    {

        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },

        order: {
            type: mongoose.Types.ObjectId,
            ref: "Order",
            required: true,
            unique: true,
        },

        razorpayOrderId: {
            type: String,
            default: null,
        },

        razorpayPaymentId: {
            type: String,
            default: null,
        },

        razorpaySignature: {
            type: String,
            default: null,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            enum: ["Created", "Paid", "Failed"],
            default: "Created",
        },


    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model("Payment", paymentSchema);

export { Payment };