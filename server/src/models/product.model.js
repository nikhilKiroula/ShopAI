import { url } from "inspector";
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {

        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        brand: {
            type: String,
            trim: true,
        },

        images: [
            {
                url: {
                    type: String,
                    required: true,
                },

                publicId:{
                    type: String,
                    required: true,
                }
            },
        ],

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        ratings: {
            average: {
                type: Number,
                max: 5,
                min: 0,
                default: 0,
            },

            count:{
                type:Number,
                default:0,
                min:0,
            }
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export { Product }