import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {

        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        }
    },
    { timestamps: true });

export const User = mongoose.model("User", userSchema)