import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  registerUser,
  loginUser,
  refreshAccessToken,
  getProfile,
  // logoutUser, // authMiddleware banne ke baad add karenge
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/refresh-token", refreshAccessToken);

router.get("/profile", verifyJWT, getProfile);

// Logout baad me authMiddleware ke saath:
// router.post("/logout", authMiddleware, logoutUser);

export default router;