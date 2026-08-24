import { Router } from "express";

import {
    getAllUsers,
    getUserById,
    updateUserRole,
    toggleUserStatus,
} from "../controllers/adminUser.controller.js";

import {
    verifyJWT,
    verifyAdmin,
} from "../middlewares/auth.middleware.js";

const router = Router();

// Every admin user route requires:
// 1. Authentication
// 2. Admin role

router.use(verifyJWT, verifyAdmin);

// GET /api/admin/users
router.get("/", getAllUsers);

// GET /api/admin/users/:userId
router.get("/:userId", getUserById);

// PATCH /api/admin/users/:userId/role
router.patch("/:userId/role", updateUserRole);

// PATCH /api/admin/users/:userId/status
router.patch("/:userId/status", toggleUserStatus);

export default router;