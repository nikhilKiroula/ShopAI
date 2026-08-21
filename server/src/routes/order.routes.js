import { Router } from "express";

import {
    createOrder,
    getMyOrders,
    getOrder,
    cancelOrder,
} from "../controllers/order.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
 
router.use(verifyJWT);

router.post("/", createOrder);

router.get("/", getMyOrders);

router.get("/:orderId", getOrder);

router.patch("/:orderId/cancel", cancelOrder);

export default router;