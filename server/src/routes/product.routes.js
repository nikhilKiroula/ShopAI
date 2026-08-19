import { Router } from "express";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/",verifyJWT,verifyAdmin,upload.array("images", 5),createProduct);router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.patch("/:productId", verifyJWT, verifyAdmin, updateProduct);
router.delete("/:productId", verifyJWT, verifyAdmin, deleteProduct);

export default router; 