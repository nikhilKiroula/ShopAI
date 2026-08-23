import { Router } from "express";

import { getDashboardStats } from "../controllers/adminDashboard.controller.js";

import {
    verifyJWT,
    verifyAdmin,
} from "../middlewares/auth.middleware.js";

const router = Router();

// Every dashboard route requires:
// 1. Logged-in user
// 2. Admin role
router.use(verifyJWT, verifyAdmin);

// GET /api/admin/dashboard/stats
router.get("/stats", getDashboardStats);

export default router;