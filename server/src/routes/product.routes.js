import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/", verifyJWT, createProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.patch("/:productId", verifyJWT, updateProduct);
router.delete("/:productId", verifyJWT, deleteProduct);

export default router; 