import { Router } from "express";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    getAdminProducts,
    getAdminProductById,
    getCategories,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/", verifyJWT, verifyAdmin, upload.array("images", 5), createProduct);
router.get("/categories", getCategories)
router.get("/", getAllProducts);
router.get("/admin", verifyJWT, verifyAdmin, getAdminProducts);
router.get("/admin/:productId", verifyJWT, verifyAdmin, getAdminProductById);
router.get("/:productId", getProductById);
router.patch("/:productId", verifyJWT, verifyAdmin, upload.array("images", 5), updateProduct);
router.delete("/:productId", verifyJWT, verifyAdmin, deleteProduct);

export default router; 