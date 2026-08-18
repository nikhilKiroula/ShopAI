import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    getProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/refresh-token", refreshAccessToken);

router.post("/logout", verifyJWT, logoutUser)

router.get("/profile", verifyJWT, getProfile);

export default router;