import { Router } from "express";

import {
    createPaymentOrder,
    verifyPayment,
} from "../controllers/payment.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/create", createPaymentOrder);
router.post("/verify", verifyPayment);

export default router;
