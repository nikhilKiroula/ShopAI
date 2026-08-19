import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add Product to Cart
const addToCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity = 1 } = req.body;

    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
        throw new ApiError(400, "Quantity must be at least 1");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (!product.isActive) {
        throw new ApiError(400, "Product is not available");
    }

    if (product.stock < Number(quantity)) {
        throw new ApiError(400, "Insufficient stock");
    }

    let cart = await Cart.findOne({
        user: req.user._id,
    });

    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            items: [
                {
                    product: productId,
                    quantity: Number(quantity),
                },
            ],
        });
    } else {
        const existingItem = cart.items.find(
            (item) =>
                item.product.toString() === productId
        );

        if (existingItem) {
            const newQuantity =
                existingItem.quantity + Number(quantity);

            if (newQuantity > product.stock) {
                throw new ApiError(
                    400,
                    "Requested quantity exceeds available stock"
                );
            }

            existingItem.quantity = newQuantity;
        } else {
            cart.items.push({
                product: productId,
                quantity: Number(quantity),
            });
        }

        await cart.save();
    }

    const updatedCart = await Cart.findById(cart._id)
        .populate(
            "items.product",
            "name price images stock isActive"
        );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedCart,
                "Product added to cart successfully"
            )
        );
});


// Get Cart
const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({
        user: req.user._id,
    }).populate(
        "items.product",
        "name price images stock isActive"
    );

    if (!cart) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        items: [],
                    },
                    "Cart fetched successfully"
                )
            );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                cart,
                "Cart fetched successfully"
            )
        );
});


// Update Cart Item Quantity
const updateCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (
        quantity === undefined ||
        !Number.isInteger(Number(quantity)) ||
        Number(quantity) < 1
    ) {
        throw new ApiError(
            400,
            "Quantity must be at least 1"
        );
    }

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

    if (Number(quantity) > product.stock) {
        throw new ApiError(
            400,
            "Requested quantity exceeds available stock"
        );
    }

    const cart = await Cart.findOne({
        user: req.user._id,
    });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const item = cart.items.find(
        (item) =>
            item.product.toString() === productId
    );

    if (!item) {
        throw new ApiError(
            404,
            "Product not found in cart"
        );
    }

    item.quantity = Number(quantity);

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
        .populate(
            "items.product",
            "name price images stock isActive"
        );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedCart,
                "Cart item updated successfully"
            )
        );
});


// Remove Product from Cart
const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({
        user: req.user._id,
    });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const itemExists = cart.items.some(
        (item) =>
            item.product.toString() === productId
    );

    if (!itemExists) {
        throw new ApiError(
            404,
            "Product not found in cart"
        );
    }

    cart.items = cart.items.filter(
        (item) =>
            item.product.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
        .populate(
            "items.product",
            "name price images stock isActive"
        );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedCart,
                "Product removed from cart successfully"
            )
        );
});


// Clear Cart
const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({
        user: req.user._id,
    });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    cart.items = [];

    await cart.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                cart,
                "Cart cleared successfully"
            )
        );
});


export {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};