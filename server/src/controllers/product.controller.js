import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/cloudinary.js";

const createProduct = asyncHandler(async (req, res) => {

    const {
        name,
        description,
        price,
        category,
        brand,
        stock
    } = req.body;

    if (!name || !description || price === undefined || !category || !brand || stock === undefined)
        throw new ApiError(400, "Name, description, price and category are required");

    if (!req.files || req.files.length === 0)
        throw new ApiError(400, "At least one product image is required");

    const uploadedImages = [];

    for (const file of req.files) {
        const uploadedImage = await uploadOnCloudinary(
            file.path,
            "shopai/products"
        );

        if (!uploadedImage) {
            throw new ApiError(
                500,
                "Failed to upload product image"
            );
        }

        uploadedImages.push({
            url: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
        });
    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        brand,
        stock,
        images: uploadedImages,
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
console.log("body",req.body);

    const {
        name,
        description,
        price,
        category,
        brand,
        stock,
        isActive,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Update normal product fields
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (brand !== undefined) product.brand = brand;
    if (stock !== undefined) product.stock = stock;
    if (isActive !== undefined) product.isActive = isActive;

    // Update images only when new images are provided
    if (req.files && req.files.length > 0) {
        // Delete old images from Cloudinary
        for (const image of product.images) {
            await deleteFromCloudinary(image.publicId);
        }

        const uploadedImages = [];

        for (const file of req.files) {
            const uploadedImage = await uploadOnCloudinary(
                file.path,
                "shopai/products"
            );

            if (!uploadedImage) {
                throw new ApiError(
                    500,
                    "Failed to upload product image"
                );
            }

            uploadedImages.push({
                url: uploadedImage.secure_url,
                publicId: uploadedImage.public_id,
            });
        }

        product.images = uploadedImages;
    }

    const updatedProduct = await product.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedProduct,
                "Product updated successfully"
            )
        );
});
const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Delete images from Cloudinary
    for (const image of product.images) {
        await deleteFromCloudinary(image.publicId);
    }

    await Product.findByIdAndDelete(productId);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Product deleted successfully"
            )
        );
});


export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
}