import { Router } from "express";

import {
    getAllOrders,
    getAdminOrderById,
    updateOrderStatus,
    refundOrder,
} from "../controllers/order.controller.js";

import {
    verifyJWT,
    verifyAdmin,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT, verifyAdmin);

router.get("/", getAllOrders);
router.get("/:orderId", getAdminOrderById);

router.patch("/:orderId/status",updateOrderStatus);
router.patch("/:orderId/refund",refundOrder);

export default router;