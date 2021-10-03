import express from 'express';

import checkAuth from '../middlewares/checkAuth.js';
import {
  checkShippingInputs,
  validateInputs,
} from '../middlewares/validateInputs.js';
import {
  getUserShippingAddresses,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
} from '../controllers/shipping-controller.js';

const router = express.Router();

router.get('/users/:uid', checkAuth, getUserShippingAddresses);
router.post(
  '/users/:uid/new',
  checkAuth,
  checkShippingInputs,
  validateInputs,
  createShippingAddress
);
router.patch(
  '/:sid/users/:uid',
  checkAuth,
  checkShippingInputs,
  validateInputs,
  updateShippingAddress
);
router.delete('/:sid/users/:uid', checkAuth, deleteShippingAddress);

export default router;
