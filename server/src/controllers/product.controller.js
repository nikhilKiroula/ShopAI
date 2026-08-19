import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProduct = asyncHandler(async (req, res) => {

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


export { createProduct }