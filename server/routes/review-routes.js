import express from 'express';

import checkAdmin from '../middlewares/checkAdmin.js';
import checkAuth from '../middlewares/checkAuth.js';
import {
  getAllProductReviews,
  getAllUserReviews,
  createReview,
  deleteReview,
} from '../controllers/review-controller.js';
import {
  checkProductReviewInputs,
  validateInputs,
} from '../middlewares/validateInputs.js';
const router = express.Router();

router.get('/products/:pid', getAllProductReviews);
router.get('/users/:uid', getAllUserReviews);
router.post(
  '/products/:pid',
  checkAuth,
  checkProductReviewInputs,
  validateInputs,
  createReview
);
router.delete('/:rid', checkAuth, checkAdmin, deleteReview);

export default router;
