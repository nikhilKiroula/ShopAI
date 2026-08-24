import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// =====================================================
// Get All Users
// =====================================================

const getAllUsers = asyncHandler(async (req, res) => {
    const { search } = req.query;

    const filter = {};

    // Search by name or email
    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                email: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    const users = await User.find(filter)
        .select("-password -refreshToken")
        .sort({
            createdAt: -1,
        });

    return res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users fetched successfully"
        )
    );
});

// =====================================================
// Get Single User
// =====================================================

const getUserById = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId)
        .select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User fetched successfully"
        )
    );
});

// =====================================================
// Update User Role
// =====================================================

const updateUserRole = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
        throw new ApiError(
            400,
            "Invalid role"
        );
    }

    // Admin should not be able to change their own role
    if (req.user._id.toString() === userId) {
        throw new ApiError(
            400,
            "You cannot change your own role"
        );
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.role = role;

    await user.save();

    const updatedUser = await User.findById(userId)
        .select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedUser,
            "User role updated successfully"
        )
    );
});

// =====================================================
// Toggle User Active Status
// =====================================================

const toggleUserStatus = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Admin should not be able to deactivate themselves
    if (req.user._id.toString() === userId) {
        throw new ApiError(
            400,
            "You cannot change your own account status"
        );
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.isActive = !user.isActive;

    await user.save();

    const updatedUser = await User.findById(userId)
        .select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedUser,
            `User ${
                user.isActive
                    ? "activated"
                    : "deactivated"
            } successfully`
        )
    );
});

export {
    getAllUsers,
    getUserById,
    updateUserRole,
    toggleUserStatus,
};