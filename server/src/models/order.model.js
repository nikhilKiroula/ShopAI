import mongoose, { Schema } from "mongoose";


// --------------------------------------------------
// Order Item Schema
// Stores product information at the time of purchase
// --------------------------------------------------

const orderItemSchema = new Schema(
    {
        // Reference to the original product
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        // Store product name separately
        // so old orders remain readable even if product changes
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // Store the product image used in the order
        image: {
            type: String,
            default: "",
        },

        // Store the price at the time of purchase
        // This should not change if the product price changes later
        price: {
            type: Number,
            required: true,
            min: 0,
        },

        // Quantity purchased
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    {
        // Order items do not need their own MongoDB _id
        _id: false,
    }
);


// --------------------------------------------------
// Shipping Address Schema
// Stores a snapshot of the address used for the order
// --------------------------------------------------

const shippingAddressSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        addressLine: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        state: {
            type: String,
            required: true,
            trim: true,
        },

        postalCode: {
            type: String,
            required: true,
            trim: true,
        },

        country: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        // Shipping address does not need its own _id
        _id: false,
    }
);


// --------------------------------------------------
// Order Schema
// --------------------------------------------------

const orderSchema = new Schema(
    {
        // User who placed the order
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Products included in the order
        items: {
            type: [orderItemSchema],
            required: true,

            // An order must contain at least one product
            validate: {
                validator: (items) => items.length > 0,
                message: "Order must contain at least one item",
            },
        },

        // Address snapshot used for this order
        shippingAddress: {
            type: shippingAddressSchema,
            required: true,
        },

        // Total price of all products before shipping
        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },

        // Shipping charges
        shippingCharge: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        // Final amount customer has to pay
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        // --------------------------------------------------
        // Payment Information
        // --------------------------------------------------

        // Payment method selected by the customer
        paymentMethod: {
            type: String,
            enum: [
                "COD",
                "ONLINE",
            ],
            required: true,
        },

        // Payment gateway transaction ID
        // This will be used for online payments
        paymentId: {
            type: String,
            default: null,
            trim: true,
        },

        // Current payment state
        paymentStatus: {
            type: String,
            enum: [
                "Pending",
                "Paid",
                "Failed",
                "Refunded",
            ],
            default: "Pending",
        },

        // Stores the time when payment was successfully completed
        paidAt: {
            type: Date,
            default: null,
        },

        // --------------------------------------------------
        // Order Status
        // --------------------------------------------------

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },
    },
    {
        // Automatically adds createdAt and updatedAt
        timestamps: true,
    }
);


const Order = mongoose.model("Order", orderSchema);

export { Order };