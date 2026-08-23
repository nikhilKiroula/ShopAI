import { Router } from "express";

import {
    addAddress,
    getAddresses,
    getAddress,
    updateAddress,
    deleteAddress, 
    setDefaultAddress,
} from "../controllers/address.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", addAddress);
router.get("/", getAddresses);
router.get("/:addressId", getAddress);
router.patch("/:addressId", updateAddress);
router.delete("/:addressId", deleteAddress);
router.patch("/:addressId/default", setDefaultAddress);

export default router;