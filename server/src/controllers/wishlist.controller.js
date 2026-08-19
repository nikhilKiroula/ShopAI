import { Wishlist } from "../models/wishlist.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add Product to Wishlist
const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (!product.isActive) {
        throw new ApiError(
            400,
            "Product is not available"
        );
    }

    let wishlist = await Wishlist.findOne({
        user: req.user._id,
    });

    if (!wishlist) {
        wishlist = await Wishlist.create({
            user: req.user._id,
            products: [productId],
        });
    } else {
        const alreadyExists = wishlist.products.some(
            (id) => id.toString() === productId
        );

        if (alreadyExists) {
            throw new ApiError(
                400,
                "Product already exists in wishlist"
            );
        }

        wishlist.products.push(productId);

        await wishlist.save();
    }

    const updatedWishlist = await Wishlist.findById(
        wishlist._id
    ).populate(
        "products",
        "name price images stock isActive ratings"
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedWishlist,
                "Product added to wishlist successfully"
            )
        );
});


// Get Wishlist
const getWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({
        user: req.user._id,
    }).populate(
        "products",
        "name price images stock isActive ratings"
    );

    if (!wishlist) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        products: [],
                    },
                    "Wishlist fetched successfully"
                )
            );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                wishlist,
                "Wishlist fetched successfully"
            )
        );
});


// Remove Product from Wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({
        user: req.user._id,
    });

    if (!wishlist) {
        throw new ApiError(404, "Wishlist not found");
    }

    const productExists = wishlist.products.some(
        (id) => id.toString() === productId
    );

    if (!productExists) {
        throw new ApiError(
            404,
            "Product not found in wishlist"
        );
    }

    wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
    );

    await wishlist.save();

    const updatedWishlist = await Wishlist.findById(
        wishlist._id
    ).populate(
        "products",
        "name price images stock isActive ratings"
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedWishlist,
                "Product removed from wishlist successfully"
            )
        );
});


// Clear Wishlist
const clearWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({
        user: req.user._id,
    });

    if (!wishlist) {
        throw new ApiError(404, "Wishlist not found");
    }

    wishlist.products = [];

    await wishlist.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                wishlist,
                "Wishlist cleared successfully"
            )
        );
});


export {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist,
};