import { Router } from "express";

import {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist,
} from "../controllers/wishlist.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/:productId", addToWishlist);

router.get("/", getWishlist);

router.delete("/:productId", removeFromWishlist);

router.delete("/", clearWishlist);

export default router;