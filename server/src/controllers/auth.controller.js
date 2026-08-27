import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { sendEmail } from "../utils/sendEmail.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { generateAccessAndRefreshToken } from "../utils/generateTokens.js";


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User registered successfully"
        )
    );
});




const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // 2. Find user
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    // 3. Compare password
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    // 4. Generate tokens
    const { accessToken, refreshToken } =
        await generateAccessAndRefreshToken(user._id);

    // 5. Store refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // 6. Remove sensitive fields
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // 7. Send response

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );
});



const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?.userId);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(
                401,
                "Refresh token is expired or used"
            );
        }

        const {
            accessToken,
            refreshToken: newRefreshToken,
        } = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newRefreshToken,
                    },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        throw new ApiError(
            401,
            error?.message || "Invalid refresh token"
        );
    }
});


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                null,
                "User logged out successfully"
            )
        );
});


const getProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "User profile fetched successfully"
        )
    );
});


const forgotPassword = asyncHandler(async (req, res) => {
     console.log("🔥 FORGOT PASSWORD CONTROLLER HIT");

    console.log("Request body:", req.body);
    
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

        console.log("Email received:", email);

    const user = await User.findOne({
        email: email.toLowerCase(),
    });

    console.log("User found:", user ? user._id : "USER NOT FOUND");

    // Don't reveal whether email exists
    if (!user) {
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "If an account exists with this email, a reset link has been sent"
            )
        );
    }

    // Generate raw token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store hashed token in DB
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.resetPasswordToken = hashedToken;

    // Token valid for 15 minutes
    user.resetPasswordExpires =
        Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetUrl =
        `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("🚀 ABOUT TO SEND EMAIL");
console.log("To:", user.email);
console.log("Reset URL:", resetUrl);

    await sendEmail({
        to: user.email,
        subject: "Reset your ShopAI password",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Reset Your ShopAI Password</h2>

                <p>
                    We received a request to reset your password.
                </p>

                <p>
                    Click the button below to create a new password.
                </p>

                <a
                    href="${resetUrl}"
                    style="
                        display:inline-block;
                        padding:12px 20px;
                        background:#0B57D0;
                        color:white;
                        text-decoration:none;
                        border-radius:6px;
                    "
                >
                    Reset Password
                </a>

                <p style="color:#666;">
                    This link will expire in 15 minutes.
                </p>

                <p style="color:#666;">
                    If you did not request this, you can safely ignore this email.
                </p>
            </div>
        `,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "If an account exists with this email, a reset link has been sent"
        )
    );
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        throw new ApiError(400, "New password is required");
    }

    if (password.length < 6) {
        throw new ApiError(
            400,
            "Password must be at least 6 characters"
        );
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: {
            $gt: Date.now(),
        },
    });

    if (!user) {
        throw new ApiError(
            400,
            "Reset token is invalid or expired"
        );
    }

    user.password = await bcrypt.hash(password, 10);

    // Invalidate reset token
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    // Invalidate existing refresh token
    user.refreshToken = null;

    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Password reset successfully"
        )
    );
});

export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    getProfile,
    forgotPassword,
    resetPassword,
};