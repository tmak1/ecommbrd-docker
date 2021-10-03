import express from 'express';

import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import {
  getAllOrders,
  getOrderById,
  getUserOrders,
  getProductOrders,
  createOrder,
  getProductOrderByUser,
  updateOrderDelivered,
} from '../controllers/order-controller.js';

const router = express.Router();

router.get('/', checkAuth, checkAdmin, getAllOrders);
router.get('/paypalConfig', checkAuth, (req, res, next) => {
  res.send({ clientId: process.env.PAYPAL_CLIENTID });
});
router.get('/:oid', checkAuth, getOrderById);
router.get('/users/:uid', checkAuth, getUserOrders);
router.get('/products/:pid', checkAuth, checkAdmin, getProductOrders);
router.get('/products/:pid', checkAuth, getProductOrderByUser);

router.post('/new', checkAuth, createOrder);
router.patch('/:oid', checkAuth, checkAdmin, updateOrderDelivered);

export default router;
