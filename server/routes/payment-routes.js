import express from 'express';

import checkAuth from '../middlewares/checkAuth.js';
import {
  checkPaymentInputs,
  validateInputs,
} from '../middlewares/validateInputs.js';
import {
  getUserPaymentMethods,
  createPaymentMethod,
  deletePaymentMethod,
} from '../controllers/payment-controller.js';

const router = express.Router();

router.get('/users/:uid', checkAuth, getUserPaymentMethods);
router.post(
  '/users/:uid/new',
  checkAuth,
  checkPaymentInputs,
  validateInputs,
  createPaymentMethod
);
router.delete('/:payid/users/:uid', checkAuth, deletePaymentMethod);

export default router;
