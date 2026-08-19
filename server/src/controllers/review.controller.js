import { Review } from "../models/review.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Create Review
const createReview = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { ratings, comment } = req.body;

    if (ratings === undefined || !comment) {
        throw new ApiError(
            400,
            "Rating and comment are required"
        );
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const existingReview = await Review.findOne({
        product: productId,
        user: req.user._id,
    });

    if (existingReview) {
        throw new ApiError(
            400,
            "You have already reviewed this product"
        );
    }

    const review = await Review.create({
        product: productId,
        user: req.user._id,
        ratings,
        comment,
    });

    const reviews = await Review.find({
        product: productId,
    });

    const totalRating = reviews.reduce(
        (sum, review) => sum + review.ratings,
        0
    );

    product.ratings.average = Number(
        (totalRating / reviews.length).toFixed(1)
    );

    product.ratings.count = reviews.length;

    await product.save();

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                review,
                "Review created successfully"
            )
        );
});


// Get Reviews of a Product
const getProductReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const reviews = await Review.find({
        product: productId,
    })
        .populate("user", "name")
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                reviews,
                "Reviews fetched successfully"
            )
        );
});


// Update Review
const updateReview = asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const { ratings, comment } = req.body;

    if (ratings === undefined || !comment) {
        throw new ApiError(
            400,
            "Rating and comment are required"
        );
    }

    const review = await Review.findById(reviewId);

    if (!review) {
        throw new ApiError(404, "Review not found");
    }

    if (review.user.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "You can only update your own review"
        );
    }

    review.ratings = ratings;
    review.comment = comment;

    await review.save();

    const reviews = await Review.find({
        product: review.product,
    });

    const totalRating = reviews.reduce(
        (sum, review) => sum + review.ratings,
        0
    );

    const product = await Product.findById(review.product);

    if (product) {
        product.ratings.average = Number(
            (totalRating / reviews.length).toFixed(1)
        );

        product.ratings.count = reviews.length;

        await product.save();
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                review,
                "Review updated successfully"
            )
        );
});


// Delete Review
const deleteReview = asyncHandler(async (req, res) => {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
        throw new ApiError(404, "Review not found");
    }

    if (review.user.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "You can only delete your own review"
        );
    }

    const productId = review.product;

    await Review.findByIdAndDelete(reviewId);

    const reviews = await Review.find({
        product: productId,
    });

    const product = await Product.findById(productId);

    if (product) {
        if (reviews.length === 0) {
            product.ratings.average = 0;
            product.ratings.count = 0;
        } else {
            const totalRating = reviews.reduce(
                (sum, review) => sum + review.ratings,
                0
            );

            product.ratings.average = Number(
                (totalRating / reviews.length).toFixed(1)
            );

            product.ratings.count = reviews.length;
        }

        await product.save();
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Review deleted successfully"
            )
        );
});


export {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
};