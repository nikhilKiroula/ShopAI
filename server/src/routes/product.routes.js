import { Router } from "express";

import { createProduct } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createProduct);

export default router;