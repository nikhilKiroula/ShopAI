import { Router } from "express";

import {
    createPaymentOrder,
} from "../controllers/payment.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/create", createPaymentOrder);

export default router;