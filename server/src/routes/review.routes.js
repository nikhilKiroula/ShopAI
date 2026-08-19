import { Router } from "express";

import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:productId",verifyJWT,createReview);

router.get("/:productId",getProductReviews);

router.patch("/:reviewId",verifyJWT,updateReview);

router.delete("/:reviewId",verifyJWT,deleteReview);

export default router;