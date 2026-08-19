import { Router } from "express";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";

import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/", verifyJWT, verifyAdmin, createProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.patch("/:productId", verifyJWT, verifyAdmin, updateProduct);
router.delete("/:productId", verifyJWT, verifyAdmin, deleteProduct);

export default router; 