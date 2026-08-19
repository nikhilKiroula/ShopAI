import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProduct = asyncHandler(async (req, res) => {

    console.log("body",req.body);
    
    const {
        name,
        description,
        price,
        category,
        brand,
        images,
        stock
    } = req.body;

    if (!name || !description || price === undefined || !category)
        throw new ApiError(400, "Name, description, price and category are required");

    const product = await Product.create({
        name,
        description,
        price,
        category,
        brand,
        images,
        stock,
        createdBy: req.user._id,
    });

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            product,
            "Product created successfully"
        ))
});

const getAllProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({ isActive: true });

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            products,
            "All Products Fetched Successfully"
        ));
});

const getProductById = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const product = await Product.findOne({
        _id: productId,
        isActive: true,
    });

    if (!product) throw new ApiError(404, "Product not found");

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            product,
            "Product fetched successfully"
        ))
});

const updateProduct = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const {
        name,
        description,
        price,
        category,
        brand,
        images,
        stock,
        isActive,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) throw new ApiError(404, "Product not found");

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            $set: {
                name,
                description,
                price,
                category,
                brand,
                images,
                stock,
                isActive,
            },
        },
        {
            new: true,
            runValidators: true
        }
    );

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            updatedProduct,
            "Product updated successfully"
        ))
});

const deleteProduct = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) throw new ApiError(404, "Product not found");

    await Product.findByIdAndDelete(productId);

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            null,
            "Product deleted successfully"
        ))
});

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
}