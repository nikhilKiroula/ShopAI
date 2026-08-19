import { Router } from "express";

import {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
} from "../controllers/cart.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/:productId", addToCart);

router.get("/", getCart);

router.patch("/:productId", updateCartItem);

router.delete("/:productId", removeFromCart);

router.delete("/", clearCart);

export default router;